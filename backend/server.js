//libraries
const express = require("express")
const dotenv = require("dotenv")
const colors = require("colors")
const path = require("path")

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

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

/*..........................Deployments--------------------*/

const __dirname1 = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, "/frontend/build")))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    })

} else {
    app.get("/", (req, res) => { res.send("API running successfully") })
}

/*..........................Deployments--------------------*/


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
        socket.emit("connected")

    })
    socket.on('join chat', (room) => {
        socket.join(room)
        console.log("User joined the room:" + room)
    })

    socket.on("Typing", (room) => {
        socket.in(room).emit("Typing")
    })
    socket.on("Stop Typing", (room) => {
        socket.in(room).emit("Stop Typing")
    })

    socket.on("new message", (newMessageRecieved) => {
        //  console.log("newMessageRecieved", JSON.stringify(newMessageRecieved))
        let chat = newMessageRecieved.chat
        if (!chat.users)
            return console.log("chat.users not defined")
        chat.users.forEach(user => {
            if (user._id === newMessageRecieved.sender._id)
                return
            //    console.log("inside new message socket", user)
            socket.in(user._id).emit("message received", newMessageRecieved)
        })

        socket.off("setup", () => {
            console.log("USER DISCONNECTED")
            socket.leave(userData._id)
        })


    })
})


