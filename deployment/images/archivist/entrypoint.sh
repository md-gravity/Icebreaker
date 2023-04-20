npm run prisma:deploy --workspace=@applications/archivist

if [ $? -ne 0 ]; then
  echo "Prisma deploy failed"
  exit 1
fi

echo "Debug mode: $DEBUG"

if [ "$DEBUG" == "true" ]; then
  npm run debug --workspace=@applications/archivist
else
  npm run dev --workspace=@applications/archivist
fi