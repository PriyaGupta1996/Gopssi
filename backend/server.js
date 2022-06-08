//libraries
const express = require("express")
const dotenv = require("dotenv")
const colors = require("colors")


//custom modules
const chats = require("./data/data.js")
const connectDB = require("../backend/config/db.js")
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")
const chatRoutes = require("../backend/routes/chatRoutes")
const { notFound, errorHandler } = require("../backend/middleware/errorMiddleware")

//express instance
const app = express()
dotenv.config()
connectDB()

app.use(express.json()); // to accept JSON data

app.get("/", (req, res) => {
    res.send("API is running successfully here !!")
})

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server started ${PORT}`.yellow.bold))