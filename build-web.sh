#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define directories
SRC_DIR="./src"
INCLUDE_DIR="./src/includes"
WEB_DIR="./web"

# Remove the old web directory and recreate structure
rm -rf "$WEB_DIR"
mkdir -p "$WEB_DIR/images" "$WEB_DIR/fonts" "$WEB_DIR/css" "$WEB_DIR/js"

# Copy static files and assets
cp "$SRC_DIR"/*.html "$WEB_DIR/"
cp "$SRC_DIR"/.htaccess "$WEB_DIR"/.htaccess
cp "$SRC_DIR"/favicon.ico "$WEB_DIR"/favicon.ico
cp "$SRC_DIR"/manifest.json "$WEB_DIR"/manifest.json
cp "$SRC_DIR"/images/*.* "$WEB_DIR/images/"
cp "$SRC_DIR"/fonts/*.* "$WEB_DIR/fonts/"
cp "$SRC_DIR"/css/*.* "$WEB_DIR/css/"
cp "$SRC_DIR"/js/*.* "$WEB_DIR/js/"

# Function to insert includes
insert_includes() {
  local file="$1"
  
  # Replace navigation placeholder
  if grep -q "<!-- INCLUDE NAVIGATION -->" "$file"; then
    sed -i '' '/<!-- INCLUDE NAVIGATION -->/{
      r '"$INCLUDE_DIR"'/nav.html
      d
    }' "$file"
  fi
  
  # Replace footer placeholder
  if grep -q "<!-- INCLUDE FOOTER -->" "$file"; then
    sed -i '' '/<!-- INCLUDE FOOTER -->/{
      r '"$INCLUDE_DIR"'/footer.html
      d
    }' "$file"
  fi
}

# Get current timestamp
timestamp=$(date +%s)

# Process each HTML file
for html in "$WEB_DIR"/*.html; do
  # Insert includes
  insert_includes "$html"
  
  # Append timestamp to CSS file reference
  sed -i '' "s|href=\"css/styles.css\"|href=\"css/styles.css?v=$timestamp\"|g" "$html"
done

# Set permissions
chmod -R o+rx "$WEB_DIR/"
