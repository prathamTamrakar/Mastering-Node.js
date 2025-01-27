const express = require("express")
const router = express.Router()
const { handleGeneratedShortURL, handleGetAnalytics } = require('../controller/url')

router.post('/',handleGeneratedShortURL)

router.get('/analytics/:shortId',handleGetAnalytics)

module.exports = router;