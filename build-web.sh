#!/bin/bash

rm -rf web
mkdir -p web/images web/fonts web/css

cp ./src/index.html web/index.html
cp ./src/favicon.ico web/favicon.ico
cp ./src/manifest.json web/manifest.json

cp ./src/images/*.* web/images/
cp ./src/fonts/*.* web/fonts/
cp ./src/css/*.* web/css/

chmod -R o+rx web/
