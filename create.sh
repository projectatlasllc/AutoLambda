#1 - Function Name
#2 - Runtime
#3 - Role ARN
#4 - File Name
#5 - Init Code
#6 - Description




message='Created Function with Name: '
blob='fileb://deployment.zip'
readme='readme.md'

mkdir $1 
cd $1

#If runtime is node, ignore node_modules folders in the git commits
if [[ $2 == *"node"* ]]; then
  echo "node_modules/" >> /.gitignore
fi

touch $4 
touch  $readme
echo $5 >> $4
echo $6 >> $readme
git add ./$1
git commit -m $message$1 -- $1 #Stage and Commit Lambda Function with Update Details
zip -r "deployment.zip" . >/dev/null #zip deployment package
tput setaf 2
aws lambda create-function --function-name $1 --runtime $2 --role $3 --handler main.myHandler --zip-file $blob --description "$6"
tput sgr0
echo $message$1
git push