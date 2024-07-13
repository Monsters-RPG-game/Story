#!/bin/bash
echo "Initializing database"
npm run migrate:init

echo "Running migration"
npm run migrate:latest

echo "Starting service"

if [ "$NODE_ENV" = "production" ]; then
  npm run start
else
  npm run start:testDev
fi
