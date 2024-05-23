#!/bin/sh

data=$(git status --short | awk '/icons\/.*\.svg$/ {print $2}')

i=0
for path in $data; do
  # make file, docs/icons/zorin.md
  touch "docs/content/${path%.svg}.md" || exit 0

  file_name=$(basename "$path" .svg)
  cat <<EOF > "docs/content/${path%.svg}.md"
---
title: "${file_name}"
categories:
  - Brand
tags:
  - brand
---
EOF

  # Increment the counter
  i=$((i+1))
  printf "."
  if [ $((i % 40)) -eq 0 ]; then
    echo
  fi
done
