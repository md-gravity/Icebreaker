rm -rf code && mkdir code

ROOT_FILES=$(find ../../../ -maxdepth 1 -type f -name '*')
for file in $ROOT_FILES; do
  echo "Copying File code/$(basename $file)"
  cp "$file" code
done

ROOT_FOLDERS=$(find ../../../ -maxdepth 1 -type d -regex '.*\w' | grep -E "(applications)|(packages)")
for rootDir in $ROOT_FOLDERS; do
  echo "Creating Root Folder code/$(basename "$rootDir")"
  mkdir "code/$(basename "$rootDir")"
done

APPLICATIONS_ROOT=$(find ../../../applications/* -maxdepth 0 -type d -name '*')
for applicationRoot in $APPLICATIONS_ROOT; do
  echo "Creating Folder code/applications/$(basename "$applicationRoot")"
  mkdir "code/applications/$(basename "$applicationRoot")"

  FILES=$(find "$applicationRoot" -maxdepth 1 -type f -name '*')
  for file in $FILES; do
    echo "Copying File code/applications/$(basename "$applicationRoot")/$(basename "$file")"
    cp "$file" "code/applications/$(basename "$applicationRoot")/$(basename "$file")"
  done

    FOLDERS=$(find "$applicationRoot" -maxdepth 1 -type d -regex '.*\w' | grep -vE "(node_modules)|(build)|(\.turbo)|($(basename "$applicationRoot"))"$)
    for folder in $FOLDERS; do
      echo "Copying $folder to the code/applications/$(basename "$applicationRoot")"
      cp -r "$folder" "code/applications/$(basename "$applicationRoot")"
    done
done

PACKAGES_ROOT=$(find ../../../packages/* -maxdepth 0 -type d -name '*')
for packagesRoot in $PACKAGES_ROOT; do
  echo "Creating Folder code/packages/$(basename "$packagesRoot")"
  mkdir "code/packages/$(basename "$packagesRoot")"

  FILES=$(find "$packagesRoot" -maxdepth 1 -type f -name '*')
  for file in $FILES; do
    echo "Copying File code/packages/$(basename "$packagesRoot")/$(basename "$file")"
    cp "$file" "code/packages/$(basename "$packagesRoot")/$(basename "$file")"
  done

    FOLDERS=$(find "$packagesRoot" -maxdepth 1 -type d -regex '.*\w' | grep -vE "(node_modules)|(build)|(\.turbo)|($(basename "$packagesRoot"))"$)
    for folder in $FOLDERS; do
      echo "Copying $folder to the code/packages/$(basename "$packagesRoot")"
      cp -r "$folder" "code/packages/$(basename "$packagesRoot")"
    done
done