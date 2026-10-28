#!/bin/sh
# Stamps a new ?v= on the CSS/JS links in every page so browsers fetch the
# fresh files after an update instead of a cached old copy.
# Run before committing a change to css/ or js/:  sh scripts/bump-version.sh
cd "$(dirname "$0")/.." || exit 1
v=$(date +%Y%m%d%H%M%S)
for f in *.html; do
  sed -i '' -E "s#(href=\"css/styles\.css|src=\"js/[a-z-]+\.js)(\?v=[0-9]+)?\"#\1?v=$v\"#g" "$f"
done
echo "Stamped v=$v"
