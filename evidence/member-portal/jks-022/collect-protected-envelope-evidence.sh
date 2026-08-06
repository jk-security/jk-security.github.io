#!/usr/bin/env bash
set -euo pipefail

REPO="${HOME}/dev/mockco-agentic-dev-v3"
RELAY="http://127.0.0.1:8080"
COOKIE=$(mktemp)
LOGIN=$(mktemp)
BUNDLE=$(mktemp)

cleanup() {
  rm -f "$COOKIE" "$LOGIN" "$BUNDLE"
}
trap cleanup EXIT

read -rsp 'Synthetic lab password: ' PASSWORD
printf '\n'

cd "$REPO"

printf 'Repository revision: %s\n' "$(git rev-parse --short HEAD)"
printf '%s\n\n' 'Path: Browser -> DMZ relay -> Production backend'

login_status=$(
  curl -sS -c "$COOKIE" -b "$COOKIE" \
    -H 'Content-Type: application/json' \
    -d "{\"username\":\"avery\",\"password\":\"${PASSWORD}\"}" \
    -o "$LOGIN" -w '%{http_code}' \
    "$RELAY/api/member-portal/session/login"
)

step_up_status=$(
  curl -sS -c "$COOKIE" -b "$COOKIE" \
    -X POST -o /dev/null -w '%{http_code}' \
    "$RELAY/api/member-portal/session/step-up"
)

bundle_status=$(
  curl -sS -c "$COOKIE" -b "$COOKIE" \
    -o "$BUNDLE" -w '%{http_code}' \
    "$RELAY/api/member-portal/documents/DOC-100001/protected-bundle"
)

printf 'Login: HTTP %s\n' "$login_status"
printf 'Step-up: HTTP %s\n' "$step_up_status"
printf 'Protected bundle: HTTP %s\n\n' "$bundle_status"

jq '{
  document_ref,
  bundle_ref,
  protection_status,
  ciphertext_encoding,
  ciphertext_length: (.ciphertext | length),
  encryption,
  kdf,
  browser_decrypt_available,
  plaintext_available,
  plaintext_field_present: has("plaintext"),
  lab_only
}' "$BUNDLE"