"""Validates the Alex v1 system prompt against 6 canonical reply scenarios."""

import json
import os
import sys
from pathlib import Path

try:
    from anthropic import Anthropic
except ImportError:
    print("ERROR: 'anthropic' package not installed. Run: pip install anthropic", file=sys.stderr)
    sys.exit(1)

MODEL = "claude-sonnet-4-5"
TEMPERATURE = 0.3
MAX_TOKENS = 1024
PROMPT_PATH = Path(__file__).parent / "alex_system_prompt_v1.md"
REQUIRED_KEYS = {"classification", "reply_body", "internal_note", "escalation_reason"}
VALID_CLASSIFICATIONS = {
    "INTERESTED_BOOK",
    "INTERESTED_QUESTIONS",
    "OBJECTION",
    "NOT_INTERESTED",
    "ESCALATE_TO_MIKE",
}

COLD_EMAIL_BODY = (
    "Hey — I run FoundationWeb, we build websites for contractors in the tri-state. "
    "Already built a homepage mock for your company, no strings. "
    "Worth a 20-min call with Mike to walk through it?"
)

TEST_CASES = [
    ("Yeah let's talk, when works?", "INTERESTED_BOOK"),
    ("How much does this cost?", "INTERESTED_QUESTIONS"),
    ("I already have a website, thanks.", "OBJECTION"),
    ("Remove me from this list.", "NOT_INTERESTED"),
    ("Are you an AI?", "ESCALATE_TO_MIKE"),
    ("I have a $50k kitchen remodel project, can you help?", "ESCALATE_TO_MIKE"),
]


def build_user_input(latest_reply: str) -> str:
    payload = {
        "thread_history": f"{COLD_EMAIL_BODY}\n\n[prospect reply: {latest_reply}]",
        "latest_reply": latest_reply,
        "lead_data": {
            "company": "Test Co",
            "vertical": "Roofing",
            "exchange_count": 0,
            "status": "New",
        },
    }
    return json.dumps(payload, indent=2)


def extract_json(text: str) -> dict | None:
    """Parse JSON from the model's response, tolerating ```json fences."""
    stripped = text.strip()
    if stripped.startswith("```"):
        lines = stripped.splitlines()
        lines = [ln for ln in lines if not ln.startswith("```")]
        stripped = "\n".join(lines).strip()
    try:
        return json.loads(stripped)
    except json.JSONDecodeError:
        start = stripped.find("{")
        end = stripped.rfind("}")
        if start != -1 and end > start:
            try:
                return json.loads(stripped[start : end + 1])
            except json.JSONDecodeError:
                return None
        return None


def run_case(client: Anthropic, system_prompt: str, latest_reply: str) -> dict:
    user_input = build_user_input(latest_reply)
    resp = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        temperature=TEMPERATURE,
        system=system_prompt,
        messages=[{"role": "user", "content": user_input}],
    )
    raw = "".join(block.text for block in resp.content if block.type == "text")
    parsed = extract_json(raw)
    return {"raw": raw, "parsed": parsed}


def main() -> int:
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("ERROR: ANTHROPIC_API_KEY not set. Export it and rerun.", file=sys.stderr)
        return 2

    if not PROMPT_PATH.exists():
        print(f"ERROR: {PROMPT_PATH} not found.", file=sys.stderr)
        return 2

    system_prompt = PROMPT_PATH.read_text(encoding="utf-8")
    client = Anthropic()

    results = []
    for i, (reply, expected) in enumerate(TEST_CASES, start=1):
        print(f"[{i}/{len(TEST_CASES)}] Running: {reply[:60]}...", flush=True)
        try:
            outcome = run_case(client, system_prompt, reply)
        except Exception as e:
            results.append(
                {
                    "idx": i,
                    "input": reply,
                    "expected": expected,
                    "actual": None,
                    "reply_body": "",
                    "json_valid": False,
                    "schema_ok": False,
                    "passed": False,
                    "error": f"API error: {e}",
                }
            )
            continue

        parsed = outcome["parsed"]
        json_valid = parsed is not None
        schema_ok = json_valid and REQUIRED_KEYS.issubset(parsed.keys())
        actual = parsed.get("classification") if schema_ok else None
        class_ok = (
            schema_ok
            and actual in VALID_CLASSIFICATIONS
            and actual == expected
        )
        passed = bool(json_valid and schema_ok and class_ok)
        results.append(
            {
                "idx": i,
                "input": reply,
                "expected": expected,
                "actual": actual,
                "reply_body": (parsed or {}).get("reply_body", "")[:200],
                "json_valid": json_valid,
                "schema_ok": schema_ok,
                "passed": passed,
                "error": None if json_valid else f"Invalid JSON. Raw: {outcome['raw'][:200]}",
            }
        )

    print()
    print("=" * 110)
    print(f"{'#':<3} {'PASS':<5} {'EXPECTED':<22} {'ACTUAL':<22} INPUT")
    print("-" * 110)
    for r in results:
        mark = "PASS" if r["passed"] else "FAIL"
        actual = r["actual"] or "(none)"
        print(f"{r['idx']:<3} {mark:<5} {r['expected']:<22} {actual:<22} {r['input'][:50]}")
    print("=" * 110)
    passed_count = sum(1 for r in results if r["passed"])
    print(f"Passed: {passed_count}/{len(results)}")

    failed = [r for r in results if not r["passed"]]
    if failed:
        print("\n--- FAILURE DETAIL ---")
        for r in failed:
            print(f"\n[Test {r['idx']}] input: {r['input']!r}")
            print(f"  expected: {r['expected']}  actual: {r['actual']}")
            print(f"  reply_body: {r['reply_body']!r}")
            if r["error"]:
                print(f"  error: {r['error']}")

    return 0 if passed_count == len(results) else 1


if __name__ == "__main__":
    sys.exit(main())
