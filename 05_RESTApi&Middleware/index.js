const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")
const app = express()
const PORT = 8000

// Middleware - plugin
// Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

// Middleware functions can perform the following tasks:

// Execute any code.
// Make changes to the request and the response objects.
// End the request-response cycle.
// Call the next middleware function in the stack.
 
app.use(express.urlencoded({extended : false}))

app.use((req,res,next)=>{
    console.log("Hello from the middleware 1");
    // return res.json({message : "Hello from the middleware 1"})
    next();
})

app.use((req,res,next)=>{
    console.log("Hello from the middleware 2");
    // return res.end("Hey")
    fs.appendFile('log.txt',`${Date.now()} ${req.method} ${req.path} \n`,(err,data)=>{
        next()
    })
})

// Routes
app.get('/users',(req,res)=>{
    const html = `
    <ul>
        ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})

app.get('/api/users',(req,res)=>{
    // res.json(data)
    res.setHeader("X-MyName", "Pratham Tamrakar") // custom headers
    // Always add X to custom headers
    return res.json(users)
})

app.route('/api/users/:id').get((req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=> user.id === id)
    if(!user) return res.status(404).json({error: 'user not found'})
    res.json(user)

}).patch((req,res)=>{
    // Edit user with ID
    return res.json({status : "pending"})
}).delete((req,res)=>{
    // Delete user with ID
    const id = Number(req.params.id)
    const user = users.find((user)=> user.id === id)
    // users.pop(user)
    return res.json({status : "Success"})
})

// app.get('/api/users/:id',(req,res)=>{
//     const id = Number(req.params.id)
//     const user = users.find((user)=> user.id === id)
//     res.json(user)

// })

app.post('/api/users',(req,res)=>{
    // Create new user
    const body = req.body // express store data which is come from frontend directly in the req.body
    // console.log(body); // without middleware it is undefined
    // express dont know what is the data and how to handle it so we  use middleware
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_tittle ){
        return res.status(400).json({msg: 'All fields are required'})
    }
    users.push({...body, id: users.length+1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    return res.status(201).json({status : "Success", id : users.length})
    })
})

app.listen(PORT,()=>{
    console.log("Server started on the port 8000")
})