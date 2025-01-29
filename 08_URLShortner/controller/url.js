// const {nanoid} = require('nanoid');
// const { nanoid } = await import('nanoid');
const shortid = require("shortid")
const URL = require('../models/url');
const { json } = require('express');

async function handleGeneratedShortURL(req, res) {
    // const { nanoid } = await import('nanoid');

    const body = req.body;
    const shortId = shortid()
    if (!body.url) {
        return res.status(400).json({
            message: "URL is required"
        })
    }
    await URL.create({
        shortId: shortId,
        redirectedUrl: body.url,
        visitedHistory: [],
        createdBy: req.user._id
    })

    return res.render("home",{
        id: shortId
    })
    // return res.json({
    //     shortId: shortId
    // })
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId })
    return res.json({
        totalClicks: result.visitedHistory.length,
        analytics: result.visitedHistory
    })
}

module.exports = {
    handleGeneratedShortURL,
    handleGetAnalytics
}