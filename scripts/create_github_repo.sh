#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "Error: set GITHUB_TOKEN with repo scope." >&2
  exit 1
fi

REPO_NAME="${1:-billing-management-system}"
DESCRIPTION="${2:-Billing management system repository}"
VISIBILITY="${3:-private}" # private|public

if [[ "$VISIBILITY" != "private" && "$VISIBILITY" != "public" ]]; then
  echo "Error: visibility must be 'private' or 'public'." >&2
  exit 1
fi

if [[ "$VISIBILITY" == "public" ]]; then
  PRIVATE_FLAG=false
else
  PRIVATE_FLAG=true
fi

curl -sS -X POST https://api.github.com/user/repos \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -d "$(cat <<JSON
{
  \"name\": \"$REPO_NAME\",
  \"description\": \"$DESCRIPTION\",
  \"private\": $PRIVATE_FLAG,
  \"auto_init\": true
}
JSON
)"

echo "Requested creation of GitHub repository: $REPO_NAME ($VISIBILITY)"
