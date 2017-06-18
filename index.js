var util = require('util');

var child_process = require('child_process');
var config = require('./config.json');
var init = require('./init.json');
var readlineSync = require('readline-sync');


var args = require('minimist')(process.argv.slice(2));


child_process.exec('chmod +x init.sh',
function (error, stdout, stderr) {});

child_process.exec('chmod +x create.sh',
function (error, stdout, stderr) {});

child_process.exec('chmod +x publish.sh',
function (error, stdout, stderr) {});





if(args['_'][0]=== "init") {
     
    var desc = readlineSync.question('Enter a description for these set of functions: ');
    var command = util.format("./init.sh \"%s\" \"%s\" ", desc );
    child_process.exec(command,
    function (error, stdout, stderr) {
        console.log(stderr);
        console.log(stdout);
        
    });

}

//Handle the init command
if(args['_'][0]=== "create") {
    var handler;
    var arn;
    var code;
    var desc;

    if(!args.handler){
    handler = config.handlerName;
    }

    if(!args.arn){
    arn = config.roleARN;
    }
    //Check if
    if(!args.name){
     throw 'Required --name <function name> parameter';
    }

    if(!args.runtime){
       throw 'Required --runtime <node; python; dotnet> parameter ';  
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
    
    var desc = readlineSync.question('Enter a function description: ');
    var command = util.format("./create.sh  \"%s\" \"%s\" \"%s\" \"%s\" \'%s\' \'%s\' ", functionName, runtime, arn, handler, code, desc);
   
    child_process.exec(command,
    function (error, stdout, stderr) {
        console.log(stdout);
        
    });

}



if(args['_'][0]=== "deploy") {
   
    var handler;
    var arn;
    var code;
    var desc;

    if(!args.handler){
    handler = config.handlerName;
    }

    if(!args.arn){
    arn = config.roleARN;
    }
    //Check if
    if(!args.name){
     throw 'Required --name <function name> parameter';
    }

    if(!args.runtime){
       throw 'Required --runtime <node; python; dotnet> parameter ';  
    }
    
    var functionName = args.name;
    var runtime = args.runtime;

    var desc = readlineSync.question('Enter a description for your changes: ');
    var command = util.format("./publish.sh \"%s\" \"%s\" ",functionname,  desc);
    child_process.exec(command,
    function (error, stdout, stderr) {
        console.log(stdout);
        
    });


}

