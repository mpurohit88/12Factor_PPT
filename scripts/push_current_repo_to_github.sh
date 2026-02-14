#!/usr/bin/env bash
set -euo pipefail

# Pushes the CURRENT local repository to your GitHub account.
# Requires: GITHUB_TOKEN (classic token with repo scope or fine-grained token with repository create/write access)
# Usage:
#   GITHUB_TOKEN=... scripts/push_current_repo_to_github.sh <repo-name> [private|public] [branch]

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "Error: set GITHUB_TOKEN with permission to create and push repositories." >&2
  exit 1
fi

REPO_NAME="${1:-$(basename "$(git rev-parse --show-toplevel)")}" 
VISIBILITY="${2:-private}" # private|public
BRANCH="${3:-$(git rev-parse --abbrev-ref HEAD)}"

if [[ "$VISIBILITY" != "private" && "$VISIBILITY" != "public" ]]; then
  echo "Error: visibility must be 'private' or 'public'." >&2
  exit 1
fi

PRIVATE_JSON=true
if [[ "$VISIBILITY" == "public" ]]; then
  PRIVATE_JSON=false
fi

echo "Resolving authenticated GitHub username..."
OWNER="$(curl -sS https://api.github.com/user \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" | sed -n 's/.*"login": "\([^"]*\)".*/\1/p' | head -n1)"

if [[ -z "$OWNER" ]]; then
  echo "Error: unable to resolve GitHub username from token." >&2
  exit 1
fi

echo "Creating (or verifying) repository $OWNER/$REPO_NAME ..."
CREATE_RESP="$(curl -sS -X POST https://api.github.com/user/repos \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -d "$(cat <<JSON
{
  \"name\": \"$REPO_NAME\",
  \"private\": $PRIVATE_JSON,
  \"auto_init\": false
}
JSON
)")"

if echo "$CREATE_RESP" | rg -q '"name": "Already Exists"'; then
  echo "Repository already exists; continuing with push."
elif echo "$CREATE_RESP" | rg -q '"full_name":'; then
  echo "Repository created successfully."
else
  echo "Warning: unexpected create response from GitHub API:"
  echo "$CREATE_RESP"
fi

REMOTE_URL="https://github.com/$OWNER/$REPO_NAME.git"

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi

echo "Pushing branch '$BRANCH' to $REMOTE_URL ..."
git push -u origin "$BRANCH"

echo "Done. Repository is available at: https://github.com/$OWNER/$REPO_NAME"
