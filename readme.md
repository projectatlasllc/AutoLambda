
# autolambda 
Simple CLI utility to organize similar AWS Lambda functions within a master directory and keep up with git. 

It is a pain to create a repo for every individual AWS lambda function, zip and manually upload packages to AWS. Syncing the two are a pain. 

autolambda will help with synchronizing your git commits and AWS Lambda function publishing. It will handle both committing and publishing for you.

## Prerequisites 

Make sure your system supports bash scripts. Tested on MacOS


1. Make sure `git` commands are available in your $PATH for your shell

2. Install the [aws-cli](https://aws.amazon.com/cli/) in your global path 

**autolambda utilizes `bash` scripts for its commands**

**folder names should be the same as AWS lambda function names**

## Install
```shell
npm install -g autolambda
```

## Usage

#### Init Main Directory
```shell
autolambda init --name myFunctions --desc "These functions are related"
cd myFunctions
```
#### Create & Publish Function for First Time
```shell
autolambda create --name HelloNode --runtime node --role "arn:aws:iam::abcdefghijk" --desc "Hello World Function in Node"  
```
#### Publish and Update to the Function
```shell   
autolambda publish --name HelloNode --desc "changed main.js text"   
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

### Delete Function
autolambda delete --name HelloNode 

Deletes function and folder

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