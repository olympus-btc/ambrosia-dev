#!/bin/bash

keys=$(jq -r 'keys[]' i18n/en/code.json)
unused_keys=()

for key in $keys; do
    # Skip theme keys that are standard docusaurus theme translations unless they seem custom
    if [[ $key == theme.* ]] && [[ $key != theme.techStack.* ]]; then
        continue
    fi

    # Search for the key as a whole word or in quotes
    if ! grep -r -E ""$key"|'$key'|\>$key\<" src docusaurus.config.js docs > /dev/null; then
        unused_keys+=("$key")
    fi
done

for key in "${unused_keys[@]}"; do
    echo "$key"
done
