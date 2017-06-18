#1 - Directory name
#2 - Modules Description

mkdir $1
echo $2 >> readme.md
git init
git add .
git commit -m "Init commit with Modules Folder"