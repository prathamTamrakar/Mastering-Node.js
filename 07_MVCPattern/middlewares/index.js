const fs = require('fs')

function logReqRes(filename){
    return (req, res, next) => {
        console.log("Hello from the middleware 2");
        // return res.end("Hey")
        fs.appendFile(filename, `${Date.now()} ${req.method} ${req.path} \n`, (err, data) => {
            next()
        })
    }
}

module.exports = {
    logReqRes
}