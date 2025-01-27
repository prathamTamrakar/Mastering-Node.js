const http = require("http")
const fs = require("fs")

// create server has a callback function for processing of the incoming reqest
const myServer = http.createServer((req,res)=>{
    const log = `${Date.now()}: ${req.url} New Request Received \n`
    fs.appendFile('log.txt',log,(err,data)=>{
        // res.end("Hello from the server Again")
        switch(req.url){
            case '/':
                res.end('Hello from the server this is Home page')
                break
            case '/about':
                res.end('This is About Page')
                break
            case '/contact_Us':
                res.end('This is Contact page')
                break
            default:
                res.end('404 Not Found')
        }
    })
    // console.log(req.headers);
    // console.log(req);
    // console.log('new request received');

    // res.end("Hello from the server")
})

myServer.listen(8000,()=>{
    console.log("Server Started");
})