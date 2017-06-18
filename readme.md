

# autolambda 
Simple CLI utility to organize similar lambda functions within a master directory. You may also create and publish functions while also publishing to git.

## Prerequisites 

Make sure your system supports bash scripts


1. Make sure `git` commands are available in your $PATH for your shell

2. Install the [aws-cli](https://aws.amazon.com/cli/) in your global path 

autolambda utilizes bash scripts for its commands

## Install
```shell
npm install -g autolambda
```

## Usage

### Init Main Directory
```shell
autolambda init
```
Asks for description for the set of functions that will be placed here.

Creates local `git` and adds a readme with description adding necessary files.

Use the init command to set-up a parent directory for all your lambda functions. Useful for creating a set of associated Lambda functions, eg. API, or image-pipeline

### Create Function
```shell
autolambda create --name <function-name> --runtime <node,python>
--role <Role ARN> 
```
Asks for function description.  You may set a default role in the `defaults.json` (Go to package install location and find the file)

Will initialize and create a Lambda function and publish to AWS. You may use `node` or `python` as a runtime. A `deployment.zip` and uploaded. 

### Publish change To Git And AWS
A separate commit is made for the creation of this function.

```shell
autolambda publish --name <function-name> 
```
Asks for the change set to commit. Commits and publishes the deployment package to Lambda.

A separate commit is made for the creation of this function. 

## Future Work

* Validation and Tests 
* Need to add settings command to easily change `defaults.json`
* Move away from to utilize REST API calls

## License
MIT