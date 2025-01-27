const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')
const { timeStamp } = require('console')
const app = express()
const PORT = 8000

// Connections
mongoose.connect('http://mongodb://27017/User')
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("Mongo Error", err))

// Schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTittle: {
        type: String,
    },
    gender: {
        type: String
    }
} /*,{ timestamps: true } */)

const User = mongoose.model("users", userSchema)

// *******************************************************************************************

app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    console.log("Hello from the middleware 1");
    // return res.json({message : "Hello from the middleware 1"})
    next();
})

app.use((req, res, next) => {
    console.log("Hello from the middleware 2");
    // return res.end("Hey")
    fs.appendFile('log.txt', `${Date.now()} ${req.method} ${req.path} \n`, (err, data) => {
        next()
    })
})

// Routes
app.get('/users',async (req, res) => {
    const allDbUsers = await User.find({})
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} ${user.lastName} - ${user.email}</li>`).join("")}
    </ul>
    `
    res.send(html)
})

app.get('/api/users', async (req, res) => {
    // res.json(data)
    const allDbUsers = await User.find({})

    res.setHeader("X-MyName", "Pratham Tamrakar") // custom headers
    // Always add X to custom headers
    return res.json(allDbUsers)
})

app.route('/api/users/:id').get(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'user not found' })
    res.json(user)

}).patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id,{lastName : 'Changed'})
    // Edit user with ID
    return res.json({ status: "Success" })
}).delete(async(req, res) => {
    // Delete user with ID
    await User.findByIdAndDelete(req.params.id)
    
    return res.json({ status: "Success" })
})

// app.get('/api/users/:id',(req,res)=>{
//     const id = Number(req.params.id)
//     const user = users.find((user)=> user.id === id)
//     res.json(user)

// })

app.post('/api/users', async (req, res) => {
    // Create new user
    const body = req.body // express store data which is come from frontend directly in the req.body
    // console.log(body); // without middleware it is undefined
    // express dont know what is the data and how to handle it so we  use middleware
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_tittle) {
        return res.status(400).json({ msg: 'All fields are required' })
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTittle: body.job_tittle
    })

    console.log("result", result)

    return res.status(201).json({ msg: "Success" })
})

app.listen(PORT, () => {
    console.log("Server started on the port 8000")
})