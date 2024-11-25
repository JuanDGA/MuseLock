#!/bin/bash

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Error: .env file not found"
    exit 1
fi

# Read each line from .env file
while IFS= read -r line || [ -n "$line" ]; do
    # Skip empty lines and comments
    if [ -z "$line" ] || [[ $line == \#* ]]; then
        continue
    fi

    # Remove any comments from the end of the line
    line=$(echo "$line" | sed 's/#.*//g')

    # Trim whitespace
    line=$(echo "$line" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')

    # Export the variable if it's valid
    if [[ $line =~ ^[A-Za-z_][A-Za-z0-9_]*= ]]; then
        export "$line"
        echo "Exported: $line"
    fi
done < .env

echo "Environment variables have been exported successfully"