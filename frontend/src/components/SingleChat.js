import { React, useState, useEffect } from 'react'
import { Box, IconButton, Text, Spinner, FormControl, Input } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { ChatState } from '../Context/ChatProvider'
import { getSender, getSenderFull } from "../config/ChatLogics"
import ProfileModal from "../components/miscellaneous/ProfileModal"
import UpdateGroupChatModal from "../components/miscellaneous/UpdateGroupChatModal"
import ScrollableChat from "../components/ScrollableChat"
import Lottie from "react-lottie"
import animationData from "../animations/typing.json"
import axios from "axios"
import "./style.css"
import io from "socket.io-client"

const ENDPOINT_LOCAL = "http://localhost:5000"
const ENDPOINT = "https://gopssi.herokuapp.com"
let socket, selectedChatCompare


const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setmessages] = useState([])
    const [loading, setloading] = useState(false)
    const [newMessage, setnewMessage] = useState()
    const { user, selectedChat, setSelectedChat, notifications, setNotifications } = ChatState()
    const [socketConnected, setsocketConnected] = useState(false)
    const [Typing, setTyping] = useState(false)
    const [IsTyping, setIsTyping] = useState(false)
    const defaultOptions = {
        loop: true,
        autoPlay: true,
        animationData: animationData,
        renderSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", user)

        socket.on("connected", () => setsocketConnected(true))
        socket.on("Typing", () => setIsTyping(true))
        socket.on("Stop Typing", () => setIsTyping(false))

    }, [])

    useEffect(() => {
        fetchMessage()
        selectedChatCompare = selectedChat
    }, [selectedChat])

    useEffect(() => {
        socket.on("message received", (newMessageRecieved) => {
            console.log("inside message received socket")
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                if (!notifications.includes(newMessageRecieved)) {
                    setNotifications([newMessageRecieved, ...notifications])
                    setFetchAgain(!fetchAgain)
                }
            }
            else {
                setmessages([...messages, newMessageRecieved])
            }
        })
    })

    const sendMessage = async (e) => {
        //    console.log("helloo", selectedChat)
        if (e.key === "Enter" && newMessage) {
            socket.emit('Stop Typing', selectedChat._id)
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                }
                setnewMessage("")
                const { data } = await axios.post('/api/message', { content: newMessage, chatId: selectedChat._id }, config)
                setmessages([...messages, data])
                console.log("chat is++++++++++++++++", data)
                socket.emit('new message', data)
            } catch (err) {
                alert("Failed to send message")
            }

        }
    }


    const typingHandler = (e) => {
        setnewMessage(e.target.value)

        if (!socketConnected)
            return
        if (!Typing) {
            setTyping(true)
            socket.emit('Typing', selectedChat._id)
        }

        let lastTypingTime = new Date().getTime()
        let timeLength = 3000

        setTimeout(() => {
            let timeNow = new Date().getTime()
            let timeDiff = timeNow - lastTypingTime
            if (timeDiff >= timeLength && Typing) {
                socket.emit("Stop Typing", selectedChat._id)
                setTyping(false)

            }

        }, timeLength)


    }

    // console.log("helllooo", selectedChat)

    const fetchMessage = async () => {
        console.log(selectedChat)
        if (!selectedChat) return
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            setloading(true)
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config)
            setmessages(data)
            setloading(false)
            console.log(messages)
            socket.emit('join chat', selectedChat._id)
        } catch (error) {
            alert("404, Not Found")
        }
    }



    return (
        <>
            {selectedChat ?
                <>
                    <Text fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center">
                        < IconButton d={{ base: "flex", md: "none" }} icon={<ArrowBackIcon />} onClick={() => setSelectedChat("")} />
                        {console.log("inside", selectedChat)}
                        {!selectedChat.IsGroupChat ?
                            (
                                <>
                                    {getSender(user, selectedChat.users)}
                                    <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                                </>) :
                            (
                                <>
                                    {selectedChat.chatName.toUpperCase()}
                                    {<UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessage={fetchMessage} />}
                                </>)
                        }
                    </Text>

                    <Box
                        d="flex" flexDir="column" justifyContent="flex-end" p={3} bg="#e8e8e8" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
                        {loading ? (<Spinner size="xl"
                            w={20} h={20} alignSelf="center" margin="auto"
                        />) : <>
                            <div className='messages'>
                                <ScrollableChat messages={messages} />
                            </div>
                            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                                {IsTyping ? <div> <Lottie options={defaultOptions} width={70} style={{ marginBottom: 14, marginLeft: 0 }} /></div> : <></>}
                                <Input variant="filled" bg="#e0e0e0" placeholder="Enter a message..." onChange={typingHandler} value={newMessage} />
                            </FormControl>
                        </>}


                    </Box>
                </>
                : <Box d="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans"> Click on a user to start chatting </Text></Box>}
        </>)
}

export default SingleChat