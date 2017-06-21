
#1 - Function Name
#2 - Commit Message


blob='fileb://deployment.zip'
git add ./$1 >/dev/null
git commit -m "Changed $1: $2" -- ./$1  >/dev/null #Stage and Commit Lambda Function with Update Details
cd $1
zip -r "deployment.zip" . >/dev/null #zip deployment package
tput setaf 2
aws lambda update-function-code --function-name $1 --zip-file $blob  #Update the Lambda Function
tput sgr0
cd .. 

