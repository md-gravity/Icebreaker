#!/bin/sh

echo "Debug mode: $DEBUG"

if [ "$DEBUG" = "true" ]
then
  npm run debug --workspace=@applications/web
else
  npm run dev --workspace=@applications/web
fi