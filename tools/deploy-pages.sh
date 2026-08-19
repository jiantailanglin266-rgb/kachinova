#!/usr/bin/env bash
# Build for GitHub Pages (project site) and publish.
#   bash tools/deploy-pages.sh
# Env overrides: REPO, OWNER, NOINDEX (1|0)
set -euo pipefail
cd "$(dirname "$0")/.."

REPO="${REPO:-kachinova}"
OWNER="${OWNER:-$(gh api user -q .login)}"
NOINDEX="${NOINDEX:-1}"

BASE_PATH="$REPO" \
NOINDEX="$NOINDEX" \
SITE_ORIGIN="https://${OWNER}.github.io" \
node tools/build.mjs

echo
echo "→ https://${OWNER}.github.io/${REPO}/"
