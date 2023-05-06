#!/bin/sh

echo "Debug mode: $DEBUG"

if [ "$DEBUG" = "true" ]
then
  npm run debug:passport
else
  npm run dev:passport
fi