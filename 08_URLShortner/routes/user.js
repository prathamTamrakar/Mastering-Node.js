const express = require("express")
const { handleUserSignUp } = require("../controller/user")


const router = express.Router()

router.post('/',handleUserSignUp)

module.exports = router;