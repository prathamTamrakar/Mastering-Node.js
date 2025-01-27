const express = require('express')
const {connectMongoDb} = require("./connection")
const { logReqRes } = require("./middlewares")
const userRouter = require("./routes/user")
const app = express()
const PORT = 8000

// Connections
connectMongoDb("mongodb://127.0.0.1:27017/User")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error", err))

//Middilewares - Plugin
app.use(express.urlencoded({ extended: false }))

app.use(logReqRes("log.txt"))

// Routes
app.use("/api/users",userRouter)


app.listen(PORT, () => {
    console.log("Server started on the port 8000")
})