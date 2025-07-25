#!/bin/bash

# Build script for Render deployment
set -e

echo "Starting build process..."

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Build client
echo "Building client..."
cd client
npm install
npm run build
cd ..

echo "Build completed successfully!"
