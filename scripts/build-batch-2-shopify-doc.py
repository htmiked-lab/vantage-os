#!/usr/bin/env python3
"""Generate the batch-2 Shopify reference doc from blog post HTML files."""
import os
import re
import sys
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "blog-posts"
OUTPUT = BLOG_DIR / "batch-2-shopify-ready.md"

FILES = sorted(
    [f for f in BLOG_DIR.glob("*.html")
     if re.match(r"^(1[1-9]|2[0-5])-", f.name)],
    key=lambda p: int(p.name.split("-", 1)[0]),
)

META_RE = re.compile(
    r"<!--(.*?)-->\s*(.*)", re.DOTALL
)
META_FIELD_RE = re.compile(r"^\s*(Meta Title|Meta Description|URL Slug):\s*(.+)$", re.MULTILINE)
H1_RE = re.compile(r"<h1>(.*?)</h1>", re.DOTALL)

def parse(path):
    text = path.read_text()
    m = META_RE.match(text)
    if not m:
        raise SystemExit(f"No meta block in {path}")
    meta_block, body = m.group(1), m.group(2).strip()
    fields = {k: v.strip() for k, v in META_FIELD_RE.findall(meta_block)}
    h1 = H1_RE.search(body)
    title = h1.group(1).strip() if h1 else ""
    return {
        "file": path.name,
        "number": int(path.name.split("-", 1)[0]),
        "title": title,
        "slug": fields.get("URL Slug", ""),
        "meta_title": fields.get("Meta Title", ""),
        "meta_description": fields.get("Meta Description", ""),
        "body": body,
    }

def render(posts):
    out = []
    out.append("# Batch 2 — Shopify Blog Post Reference (Posts 11–25)\n")
    out.append(
        "This document contains all 15 batch-2 blog posts for tiipikids.com, "
        "formatted for direct copy-paste into Shopify's blog post editor.\n"
    )
    out.append("## How to use this doc in Shopify admin\n")
    out.append(
        "For each post below:\n\n"
        "1. In Shopify admin, go to **Online Store → Blog Posts → Add blog post**.\n"
        "2. Select the **News** blog.\n"
        "3. Paste **Title** into the title field.\n"
        "4. Click the `<>` (HTML source) button on the content editor and paste the **Body HTML** block.\n"
        "5. Open **Search engine listing preview** → Edit, and paste:\n"
        "   - **Meta Title** → Page title\n"
        "   - **Meta Description** → Meta description\n"
        "   - **URL Slug** → URL handle\n"
        "6. Set visibility to **Visible** and click **Save**.\n"
    )
    out.append("---\n")

    # Table of contents
    out.append("## Table of Contents\n")
    for p in posts:
        out.append(f"- [Post {p['number']}: {p['title']}](#post-{p['number']})")
    out.append("\n---\n")

    for p in posts:
        out.append(f'<a id="post-{p["number"]}"></a>')
        out.append(f"## Post {p['number']}: {p['title']}\n")
        out.append(f"**Source file:** `blog-posts/{p['file']}`\n")

        out.append("### Title")
        out.append("```")
        out.append(p["title"])
        out.append("```\n")

        out.append("### URL Slug")
        out.append("```")
        out.append(p["slug"])
        out.append("```\n")

        out.append("### Meta Title")
        out.append(f"_{len(p['meta_title'])} characters_")
        out.append("```")
        out.append(p["meta_title"])
        out.append("```\n")

        out.append("### Meta Description")
        out.append(f"_{len(p['meta_description'])} characters_")
        out.append("```")
        out.append(p["meta_description"])
        out.append("```\n")

        out.append("### Body HTML")
        out.append(
            "_Paste this into the Shopify content editor's HTML source view "
            "(the `<>` icon). Includes the h1 — remove it if your theme "
            "auto-renders the post title._\n"
        )
        out.append("```html")
        out.append(p["body"])
        out.append("```\n")

        out.append("---\n")

    return "\n".join(out)

def main():
    posts = [parse(f) for f in FILES]
    OUTPUT.write_text(render(posts))
    print(f"Wrote {OUTPUT} ({len(posts)} posts)")

if __name__ == "__main__":
    main()
