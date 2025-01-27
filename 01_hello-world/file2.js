// const { log } = require("console");
const os = require("os")
const fs = require("fs")

console.log(os.cpus().length) // 8 

// blocking
// console.log("1");
// const result = fs.readFileSync('./contact.txt','utf-8')
// console.log(result);
// console.log('2');

console.log("1");
// non-blocking
fs.readFile('./contact.txt','utf-8',(err,result)=> {
    if(err){
        console.log("Error",err);
    }
    else{
        console.log(result);
        
    }
})
console.log('2');

// default thread pool = 4
// Max? - 8 core cpu - max thread 8