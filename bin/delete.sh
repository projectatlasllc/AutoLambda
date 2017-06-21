
#1 - Function Name


rm -r $1
aws lambda delete-function --function-name $1
