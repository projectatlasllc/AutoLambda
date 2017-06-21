

# autolambda 
Simple CLI utility to organize similar lambda functions within a master directory. You may also create and publish functions while also publishing to git.

## Prerequisites 

Make sure your system supports bash scripts


1. Make sure `git` commands are available in your $PATH for your shell

2. Install the [aws-cli](https://aws.amazon.com/cli/) in your global path 

**autolambda utilizes `bash` scripts for its commands**

**folder names should be the same as AWS lambda function names**

## Install
```shell
npm install -g autolambda
```

## Usage

```shell
autolambda init --name myFunctions --desc "These functions are related"
cd myFunctions
autolambda defaults --role "arn:aws:iam::abcdefghijk"
autolambda create --name HelloNode --runtime node --desc "Hello World Function in Node"      
autolambda publish --name HelloNode --desc "Changed file ABC"      
autolambda delete --name HelloNode 
```
## API


### Init Main Directory
```shell
autolambda init [--desc <text>] 
```

Creates local `git` and adds a readme with description from user.

Sets-up a parent directory for all your lambda functions. Useful for creating a set of associated Lambda functions, eg. API, or image-pipeline.

### Create Function
```shell
autolambda create --name <function-name> --runtime <node,python> 
[--role <Role ARN>] [--desc <text>] 
```
Asks for function description.  You may also set a default role for your session with the defaults command.

You may use `node` or `python` as a runtime. 

Will initialize and create a Lambda function and publish to AWS. The default AWS file is used to create your function. 


A `deployment.zip` is made and uploaded. 

### Publish change To Git And AWS

```shell
autolambda publish --name <function-name> 
```
Asks for the change set to commit. Commits and the deployment package to Lambda. Only commits files that have changed for this particular function.

### Set a Default Role
```shell
autolambda defaults --role <ROLE ARN> 
```
This lets you set a default role for your session that all `create` functions will use when setting up your lambda functions


## Future Work

* Validation and Tests 
* Need to add settings command to easily change `defaults.json`
* Move away from to utilize REST API calls

## License
MIT