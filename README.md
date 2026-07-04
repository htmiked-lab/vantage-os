# vantage-os

## ollama-launch-claude

Bring up a local [Ollama](https://ollama.com) model and launch
[Claude Code](https://github.com/anthropics/claude-code) against it — no
Anthropic API key required.

```bash
./ollama-launch-claude.sh
```

The script:

1. Checks that `ollama`, `claude`, and `curl` are installed.
2. Starts `ollama serve` if it isn't already running (and stops it on exit
   unless `--keep-serve` is passed).
3. Pulls the requested model if it isn't already present.
4. Points Claude Code at Ollama's OpenAI-compatible `/v1` endpoint and launches
   it.

### Options

| Flag | Env | Default | Description |
| --- | --- | --- | --- |
| `-m, --model` | `OLC_MODEL` | `qwen2.5-coder` | Model to serve |
| `-s, --small` | — | same as `--model` | Small/fast model |
| `-H, --host` | `OLC_HOST` | `127.0.0.1` | Ollama bind host |
| `-p, --port` | `OLC_PORT` | `11434` | Ollama port |
| `-k, --keep-serve` | — | off | Leave `ollama serve` running on exit |

Extra arguments after `--` are forwarded to `claude`:

```bash
./ollama-launch-claude.sh -m llama3.1 -- --dangerously-skip-permissions
```

> **Note:** Ollama exposes an OpenAI-compatible API. Claude Code is pointed at
> its `/v1` endpoint with a placeholder auth token (Ollama ignores the token,
> but Claude Code requires one to be set). Model behavior depends entirely on
> the local model you choose.
