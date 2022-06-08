import { React, useState, useEffect } from 'react'
import { Box, IconButton, Text, Spinner, FormControl, Input } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { ChatState } from '../Context/ChatProvider'
import { getSender, getSenderFull } from "../config/ChatLogics"
import ProfileModal from "../components/miscellaneous/ProfileModal"
import UpdateGroupChatModal from "../components/miscellaneous/UpdateGroupChatModal"
import axios from "axios"
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setmessages] = useState([])
    const [loading, setloading] = useState(false)
    const [newMessage, setnewMessage] = useState()
    const { user, selectedChat, setSelectedChat } = ChatState()

    const sendMessage = async (e) => {
        //    console.log("helloo", selectedChat)
        if (e.key === "Enter" && newMessage) {
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
                console.log(data)
            } catch (err) {
                alert("Failed to send message")
            }

        }
    }
    const typingHandler = (e) => { setnewMessage(e.target.value) }


    const fetchMessage = async () => {
        console.log(selectedChat)
        if (!selectedChat) return
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.toke}`
                }
            }
            setloading(true)
            const { data } = await axios.get(`/api/message/${selectedChat._id},config`)
            setmessages(data)
            setloading(false)
            console.log(messages)

        } catch (error) {
            alert("404, Not Found")
        }
    }


    // useEffect(() => {
    //     fetchMessage()
    // }, [selectedChat])

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
                        < IconButton d={{ base: "flex", md: "none" }} icon={<ArrowBackIcon />} onclick={() => setSelectedChat("")} />
                        {!selectedChat.IsGroupChat ?
                            (
                                <>
                                    {getSender(user, selectedChat.users)}
                                    <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                                </>) :
                            (
                                <>
                                    {selectedChat.chatName.toUpperCase()}
                                    {<UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                                </>)
                        }
                    </Text>

                    <Box
                        d="flex" flexDir="column" justifyContent="flex-end" p={3} bg="#e8e8e8" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
                        {loading ? (<Spinner size="xl"
                            w={20} h={20} alignSelf="center" margin="auto"
                        />) : <>
                            <div></div>
                            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
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