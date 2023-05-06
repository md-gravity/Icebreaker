#!/bin/sh

echo "Debug mode: $DEBUG"

if [ "$DEBUG" = "true" ]
then
  npm run debug:archivist
else
  npm run dev:archivist
fi