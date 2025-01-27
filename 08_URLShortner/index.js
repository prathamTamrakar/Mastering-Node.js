const express = require("express")
const app = express()
const PORT = 8001
const path = require("path")
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const {connectToMongoDB} = require("./connect")
const URL = require("./models/url")

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=> console.log("MongoDB Connected"))

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))


app.use(express.json())
app.use(express.urlencoded({extended: false}))

// app.get('/test',async (req,res)=>{
//     const allUrls = await URL.find({})
//     return res.render("home",{
//         urls: allUrls,
//     })
// })


app.use("/url",urlRoute)
app.use("/",staticRoute)
app.get("/url/:shortId", async (req,res)=>{
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{ 
        $push: {
            visitedHistory:{
                timestamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectedUrl)
})

app.listen(PORT, ()=>console.log(`Server started on the PORT: ${PORT}`))
