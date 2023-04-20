npm run prisma:deploy --workspace=@applications/passport

if [ $? -ne 0 ]; then
  echo "Prisma deploy failed"
  exit 1
fi

echo "Debug mode: $DEBUG"

if [ "$DEBUG" == "true" ]; then
  npm run debug --workspace=@applications/passport
else
  npm run dev --workspace=@applications/passport
fi