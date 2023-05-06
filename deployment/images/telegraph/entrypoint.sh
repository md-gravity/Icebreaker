#!/bin/sh

if [ "$DEBUG" = "true" ]
then
  npm run debug:telegraph
else
  npm run dev:telegraph
fi