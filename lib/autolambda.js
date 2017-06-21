var util = require('util');
var fs = require('fs');
var child_process = require('child_process');
var storage = require('node-persist');
var defaults = require('./defaults.json');
var init = require('./init.json');
var readlineSync = require('readline-sync');

console.log("DIR " + __dirname);

//you must first call storage.initSync
storage.initSync();
if(storage.getItemSync('defaults')){
    defaults = storage.getItemSync('defaults'); 
    console.log('Using ROLE: ' + defaults.roleARN);
}

var args = require('minimist')(process.argv.slice(2));


child_process.exec('chmod +x init.sh',
function (error, stdout, stderr) {});

child_process.exec('chmod +x create.sh',
function (error, stdout, stderr) {});

child_process.exec('chmod +x publish.sh',
function (error, stdout, stderr) {});


if(args['_'][0]=== "init") {
    
    

    if(!args.name){
     throw 'Required --name <directory name> parameter';
    }

    var functionName = args.name;
    var desc = args.desc;

    if(!args.desc){
      desc = readlineSync.question('Enter a description for these set of functions: ');
    }


    var command = util.format("init.sh \"%s\" \"%s\" ", functionName, desc );
    child_process.exec(command,
    function (error, stdout, stderr) {
        console.log(stderr);
        console.log(stdout);
        
    });

}

//Handle the init command
if(args['_'][0]=== "create") {
    var handler;
    var code;
    var desc;

    

    if(!args.handler){
    handler = defaults.handlerName;
    }

    var arn = args.role;

    //check if args exist
    if(!args.role){
   
    if(defaults.roleARN === "none"){
        throw 'ERROR: No roleARN found. You can set a default ARN for this session using the defaults command or use the --role arg';
    }

    arn = defaults.roleARN;
    }

    if(!args.name){
     throw 'Required --name <function name> parameter';
    }

    if(!args.runtime){
       throw 'Required --runtime <node; python; dotnet> parameter ';  
    }

    var desc = args.desc;

    if(!args.desc){
      desc = readlineSync.question('Enter a function description: ');
    }
    
    var functionName = args.name;
    var runtime = args.runtime;
    

    switch(runtime){
        case "node":
            code = init.node;
            runtime = 'nodejs6.10';
            handler = handler + '.js';
            break;
        case "python":
            code = init.python;
            runtime = 'python3.6';
            handler = handler + '.py';
            break;
        case "dotnet":
            runtime = 'dotnetcore1.0';
            handler = handler + '.cs';
            break;
        default:
            throw 'No Valid runtime given';  
    }
    
    var command = util.format("create.sh  \"%s\" \"%s\" \"%s\" \"%s\" \'%s\' \'%s\' ", functionName, runtime, arn, handler, code, desc);
   
    child_process.exec(command,
    function (error, stdout, stderr) {
        console.log(stdout);
        console.log("ERROR: " + stderr);
        
    });

}



if(args['_'][0]=== "publish") {
   
    var handler;
    var arn;
    var code;

    if(!args.handler){
    handler = defaults.handlerName;
    }

    if(!args.arn){
    arn = defaults.roleARN;
    }
    //Check if
    if(!args.name){
     throw 'Required --name <function name> parameter';
    }

    
    var functionName = args.name;
    var runtime = args.runtime;
    var desc = args.desc;

    
    if(!args.desc){
     desc = readlineSync.question('Enter a description for your changes: ');
    }

    var command = util.format("publish.sh \"%s\" \"%s\" ",functionName,  desc);
    child_process.exec(command,
    function (error, stdout, stderr) {
        console.log(stdout);
        
        if(stderr){
        console.log("ERROR: " + stderr);
        }
        
    });


}


if(args['_'][0]=== "delete") {
   
    if(!args.name){
     throw 'Required --name <function name> parameter';
    }
   
    var functionName = args.name;


    var command = util.format("delete.sh \"%s\"  ",functionName);
    child_process.exec(command,
    function (error, stdout, stderr) {
        console.log(stdout);
        
        if(stderr){
         console.log("ERROR: " + stderr);
        }
       
    });


}

if(args['_'][0]=== "defaults") {
        
if(args.role){
    defaults.roleARN = args.role;
}

//then start using it
storage.setItemSync('defaults',defaults);
console.log("Set default arn as: " + args.role);

}