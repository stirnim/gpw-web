#!/bin/bash

# Remove the old web directory and recreate structure
rm -rf web
mkdir -p web/images web/fonts web/css

# Copy static files and assets
cp ./src/index.html web/index.html
cp ./src/favicon.ico web/favicon.ico
cp ./src/manifest.json web/manifest.json
cp ./src/images/*.* web/images/
cp ./src/fonts/*.* web/fonts/
cp ./src/css/*.* web/css/

# Get current timestamp
timestamp=$(date +%s)

# Append timestamp to CSS file reference in index.html
sed -i "" "s|href=\"css/styles.css\"|href=\"css/styles.css?v=$timestamp\"|g" web/index.html

chmod -R o+rx web/
