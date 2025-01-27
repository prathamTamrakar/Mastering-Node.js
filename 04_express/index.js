// const http = require("http")
const express = require("express")
const app = express()

app.get('/', (req, res) => {
    return res.send("Hello from home page")
})

app.get('/about', (req, res) => {
    return res.send("Hello from about page \n Hey " + req.query.name)
    // res.end(`Hey ${req.query.name}`)
})

app.listen(8000, () => {
    console.log("Server Started")
})

// const myServer = http.createServer(app)
// myServer.listen(8000,()=>{
//     console.log("Server Started")
// })