//libraries
const express = require("express")
const dotenv = require("dotenv")


//custom modules
const chats = require("./data/data.js")

//express instance
const app = express()
dotenv.config()


app.get("/", (req, res) => {
    res.send("API is running successfully here !!")
})


app.get("/api/chat", (req, res) => {
    console.log(chats)
    res.send(chats)
})

app.get("/api/chat/:id", (req, res) => {
    console.log(req.params.id)
    const singleChat = chats.find((c) => c._id === req.params.id)
    console.log(singleChat)
    res.send(singleChat)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log("server started"))