const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique:true
    },
    redirectedUrl:{
        type: String,
        required:true
    },
    visitedHistory: [
        {
            timestamp:{
                type: Number
            }
        }
    ],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        red: 'users'
    }
},{ timestamps: true})

const URL = mongoose.model("url",urlSchema)

module.exports = URL;