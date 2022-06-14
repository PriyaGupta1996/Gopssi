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

const server = app.listen(PORT, console.log(`server started ${PORT}`.yellow.bold))
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    },
})

io.on("connection", (socket) => {
    console.log(`connection established with socket.io`)


    //creating the socket
    socket.on('setup', (userData) => {
        socket.join(userData._id)
        console.log(userData._id)

    })
    socket.on('join chat', (room) => {
        socket.join(room)
        console.log("User joined the room:" + room)
    })

    socket.on("new message", (newMessageRecieved) => {
        console.log("newMessageRecieved", JSON.stringify(newMessageRecieved))
        let chat = newMessageRecieved.chat
        if (!chat.users)
            return console.log("chat.users not defined")
        chat.users.forEach(user => {
            if (user === newMessageRecieved.sender._id)
                return
            console.log("inside new message socket", user)
            socket.in(user).emit("message received", newMessageRecieved)
        })


    })
})


