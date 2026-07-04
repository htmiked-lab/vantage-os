#!/usr/bin/env bash
#
# ollama-launch-claude.sh
#
# Bring up a local Ollama model and launch Claude Code against it.
#
# Ollama exposes an OpenAI-compatible API at http://<host>:<port>/v1. Claude
# Code speaks the Anthropic Messages API, so this launcher points Claude Code
# at Ollama through its /v1 endpoint and sets the model + a placeholder auth
# token (Ollama ignores the token, but Claude Code requires one to be set).
#
# Usage:
#   ./ollama-launch-claude.sh [options] [-- <extra args passed to claude>]
#
# Options:
#   -m, --model    MODEL   Ollama model to serve   (default: $OLC_MODEL or qwen2.5-coder)
#   -s, --small    MODEL   Small/fast model        (default: same as --model)
#   -H, --host     HOST    Ollama bind host         (default: $OLC_HOST or 127.0.0.1)
#   -p, --port     PORT    Ollama port              (default: $OLC_PORT or 11434)
#   -k, --keep-serve       Leave `ollama serve` running on exit (default: stop if we started it)
#   -h, --help             Show this help and exit
#
# Examples:
#   ./ollama-launch-claude.sh
#   ./ollama-launch-claude.sh -m llama3.1 -- --dangerously-skip-permissions
#   OLC_MODEL=deepseek-coder-v2 ./ollama-launch-claude.sh

set -euo pipefail

# ---- defaults -------------------------------------------------------------
MODEL="${OLC_MODEL:-qwen2.5-coder}"
SMALL_MODEL=""
HOST="${OLC_HOST:-127.0.0.1}"
PORT="${OLC_PORT:-11434}"
KEEP_SERVE=0

# PID of an `ollama serve` we started, so we can clean it up on exit.
SERVE_PID=""

# ---- pretty logging -------------------------------------------------------
if [ -t 1 ]; then
  C_BLUE=$'\033[34m'; C_GREEN=$'\033[32m'; C_YELLOW=$'\033[33m'
  C_RED=$'\033[31m'; C_DIM=$'\033[2m'; C_RESET=$'\033[0m'
else
  C_BLUE=""; C_GREEN=""; C_YELLOW=""; C_RED=""; C_DIM=""; C_RESET=""
fi
info()  { printf '%s==>%s %s\n' "$C_BLUE"  "$C_RESET" "$*"; }
ok()    { printf '%s ok%s  %s\n' "$C_GREEN" "$C_RESET" "$*"; }
warn()  { printf '%swarn%s %s\n' "$C_YELLOW" "$C_RESET" "$*" >&2; }
die()   { printf '%serr%s  %s\n' "$C_RED"   "$C_RESET" "$*" >&2; exit 1; }

usage() {
  sed -n '2,26p' "$0" | sed 's/^# \{0,1\}//'
  exit 0
}

# ---- arg parsing ----------------------------------------------------------
CLAUDE_ARGS=()
while [ $# -gt 0 ]; do
  case "$1" in
    -m|--model)  MODEL="${2:?--model needs a value}"; shift 2 ;;
    -s|--small)  SMALL_MODEL="${2:?--small needs a value}"; shift 2 ;;
    -H|--host)   HOST="${2:?--host needs a value}"; shift 2 ;;
    -p|--port)   PORT="${2:?--port needs a value}"; shift 2 ;;
    -k|--keep-serve) KEEP_SERVE=1; shift ;;
    -h|--help)   usage ;;
    --)          shift; CLAUDE_ARGS+=("$@"); break ;;
    *)           CLAUDE_ARGS+=("$1"); shift ;;
  esac
done

: "${SMALL_MODEL:=$MODEL}"
BASE_URL="http://${HOST}:${PORT}"

# ---- prerequisites --------------------------------------------------------
command -v ollama >/dev/null 2>&1 \
  || die "ollama not found. Install it: https://ollama.com/download"
command -v claude >/dev/null 2>&1 \
  || die "claude (Claude Code) not found. Install it: npm i -g @anthropic-ai/claude-code"
command -v curl >/dev/null 2>&1 \
  || die "curl not found; it is required to health-check Ollama."

# ---- cleanup --------------------------------------------------------------
cleanup() {
  if [ -n "$SERVE_PID" ] && [ "$KEEP_SERVE" -eq 0 ]; then
    info "Stopping ollama serve (pid $SERVE_PID)"
    kill "$SERVE_PID" 2>/dev/null || true
    wait "$SERVE_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

# ---- ensure ollama serve is up -------------------------------------------
serve_up() { curl -fsS "${BASE_URL}/api/tags" >/dev/null 2>&1; }

if serve_up; then
  ok "Ollama already serving at ${BASE_URL}"
else
  info "Starting ollama serve on ${HOST}:${PORT}"
  OLLAMA_HOST="${HOST}:${PORT}" ollama serve >/dev/null 2>&1 &
  SERVE_PID=$!
  for _ in $(seq 1 30); do
    serve_up && break
    sleep 0.5
  done
  serve_up || die "Ollama did not become ready at ${BASE_URL} in time."
  ok "Ollama serving (pid $SERVE_PID)"
fi

# ---- ensure the model is present -----------------------------------------
ensure_model() {
  local m="$1"
  if OLLAMA_HOST="${HOST}:${PORT}" ollama list 2>/dev/null | awk '{print $1}' | grep -qx "$m"; then
    ok "Model present: $m"
  else
    info "Pulling model: $m (first run can take a while)"
    OLLAMA_HOST="${HOST}:${PORT}" ollama pull "$m" || die "Failed to pull model: $m"
    ok "Pulled: $m"
  fi
}
ensure_model "$MODEL"
[ "$SMALL_MODEL" != "$MODEL" ] && ensure_model "$SMALL_MODEL"

# ---- launch Claude Code against Ollama -----------------------------------
info "Launching Claude Code"
printf '%s' "$C_DIM"
printf '     base model : %s\n' "$MODEL"
printf '     fast model : %s\n' "$SMALL_MODEL"
printf '     endpoint   : %s/v1\n' "$BASE_URL"
printf '%s' "$C_RESET"

export ANTHROPIC_BASE_URL="${BASE_URL}/v1"
export ANTHROPIC_AUTH_TOKEN="ollama-local"        # placeholder; Ollama ignores it
export ANTHROPIC_MODEL="$MODEL"
export ANTHROPIC_SMALL_FAST_MODEL="$SMALL_MODEL"

exec claude "${CLAUDE_ARGS[@]}"
