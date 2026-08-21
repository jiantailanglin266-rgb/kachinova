#!/usr/bin/env bash
# Build for GitHub Pages (project site) and publish.
#   bash tools/deploy-pages.sh
#
# Env overrides: REPO, OWNER, NOINDEX (1|0), THEME (light|dark)
#
# NOTE: THEME here only rebuilds the HTML/CSS. The six films are baked with the
# matching grade, so a full theme switch is TWO steps:
#   THEME=dark python tools/films.py && THEME=dark bash tools/deploy-pages.sh
set -euo pipefail
cd "$(dirname "$0")/.."

REPO="${REPO:-kachinova}"
OWNER="${OWNER:-$(gh api user -q .login)}"
NOINDEX="${NOINDEX:-1}"
THEME="${THEME:-light}"

BASE_PATH="$REPO" \
NOINDEX="$NOINDEX" \
THEME="$THEME" \
SITE_ORIGIN="https://${OWNER}.github.io" \
node tools/build.mjs

echo
echo "-> https://${OWNER}.github.io/${REPO}/  (theme=${THEME})"
