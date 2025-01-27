const express = require('express')
const {handleGetAllUsers,handleGetUserById,handleUpdateUserById,handleDeleteUserById,handleCreateNewUser,handleUserInHtml} = require("../controllers/user")
const router = express.Router()

router.get('/html',handleUserInHtml)

router.route('/').get(handleGetAllUsers).post(handleCreateNewUser)
    
router.route('/:id')
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById)

module.exports = router