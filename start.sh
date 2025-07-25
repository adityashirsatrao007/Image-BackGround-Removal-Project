#!/bin/bash

# Start script for Render deployment
set -e

echo "Starting server..."

# Install server dependencies and start
cd server
npm install
npm start
