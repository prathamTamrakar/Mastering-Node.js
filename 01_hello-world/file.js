// fs module
const fs = require("fs")

// sync... Blocking...
// fs.writeFileSync("./test.txt","hello world")

//Async... Non-blocking
// fs.writeFile("./test.txt","hello world Async",(err) => {})

// const contact = fs.readFileSync('./contact.txt','utf-8')
// console.log(contact);
// pratham tamrakar : +918989898989
// rajshri : +19999999999

// fs.readFile('./contact.txt','utf-8',(err,result) => {
//     if(err){
//         console.log("Error",err);
//     }
//     else{
//         console.log(result);
//     }
// })

// fs.appendFileSync('./test.txt', new Date().getDate().toLocaleString())
// fs.appendFileSync('./test.txt',`${Date.now()} hey! there \n`)

// fs.cpSync('./test.txt','./copy.txt')
// fs.unlinkSync('./copy.txt')
// console.log(fs.statSync('./test.txt'));

// fs.mkdirSync('mydocs/a/b')


