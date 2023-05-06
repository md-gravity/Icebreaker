#!/bin/sh

echo "Debug mode: $DEBUG"

if [ "$DEBUG" = "true" ]
then
  npm run debug:web
else
  npm run dev:web
fi