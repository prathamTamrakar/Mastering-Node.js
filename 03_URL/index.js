const http = require('http')
const fs = require('fs')
const url = require('url')

const myServer = http.createServer((req,res)=>{
    if(req.url==='/favicon.ico'){
        return res.end();
    }
    const log = `${Date.now()}: ${req.url} New Request Received \n`
    const myUrl = url.parse(req.url,true) // when parameter is true then it seperate different query parameter
    // { myname: 'pratham', userId: '1' }, diff query parameter
    console.log(myUrl);
    
    fs.appendFile('log.txt',log,(err,data)=>{
        switch(myUrl.pathname){ // from this parameter we get result with pathname does not have error when have query
            case '/':
                res.end('Hello from the server this is Home page')
                break
            case '/about':
                const username = myUrl.query.myname
                // res.end('This is About Page')
                res.end(`hi,${username}`)
                break
            case '/contact_Us':
                res.end('This is Contact page')
                break
            case '/search':
                const search = myUrl.query.q
                res.end(`Here are your Search result for ${search}`)
                break
            default:
                res.end('404 Not Found')
        }
    })
})
myServer.listen(8000,()=>{
    console.log("Server started on the port 8000")
})


// req.method
// get 
// post
// patch
// delete
// put


// Url {
//     protocol: null,
//     slashes: null,
//     auth: null,
//     host: null,
//     port: null,
//     hostname: null,
//     hash: null,
//     search: '?myname=pratham',
//     query: 'myname=pratham',
//     pathname: '/about',
//     path: '/about?myname=pratham',
//     href: '/about?myname=pratham'
//   }



// Url {
//     protocol: null,
//     slashes: null,
//     auth: null,
//     host: null,
//     port: null,
//     hostname: null,
//     hash: null,
//     search: '?myname=pratham&userId=1',
//     query: [Object: null prototype] { myname: 'pratham', userId: '1' },       
//     pathname: '/about',
//     path: '/about?myname=pratham&userId=1',
//     href: '/about?myname=pratham&userId=1'
//   }