#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-5173}"
cd "$(dirname "$0")"

existing="$(lsof -tiTCP:"$PORT" -sTCP:LISTEN || true)"
if [[ -n "$existing" ]]; then
  kill $existing
fi

echo "Pet Jet Dash local server"
echo "URL: http://127.0.0.1:${PORT}/"
echo "Use a hard refresh if the browser had an older PWA cached."
python3 -m http.server "$PORT"
