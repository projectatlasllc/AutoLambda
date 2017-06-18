
#1 - Function Name
#2 - Commit Message


blob='fileb://deployment.zip'

git commit -m "$1: $2" -- ./$1 #Stage and Commit Lambda Function with Update Details
cd $1
zip -r "deployment.zip" . #zip deployment package
aws lambda update-function-code --function-name $1 --zip-file $blob  #Update the Lambda Function
cd .. 
git push

