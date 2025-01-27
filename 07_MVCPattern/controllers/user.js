const User = require("../models/user")

async function handleUserInHtml(req,res){
    const allDbUsers = await User.find({})
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} ${user.lastName} - ${user.email}</li>`).join("")}
    </ul>
    `
    res.send(html)
}


async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
}

async function handleGetUserById(req,res){
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'user not found' })
    res.json(user)
}

async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id,{lastName : 'Changed'})
    // Edit user with ID
    return res.json({ status: "Success" })
}

async function handleDeleteUserById(req,res){
   // Delete user with ID
   await User.findByIdAndDelete(req.params.id)
    
   return res.json({ status: "Success" })
}

async function handleCreateNewUser(req,res){
   // Create new user
   const body = req.body
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

    return res.status(201).json({ msg: "Success", id: result._id })
}

module.exports = {
    handleUserInHtml,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}