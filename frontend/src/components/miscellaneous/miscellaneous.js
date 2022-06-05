import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, Button, Stack, Text } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import ChatLoading from "../ChatLoading"
import getSender from "../../config/ChatLogics"

const MyChats = () => {
    const [loggedUser, setLoggedUser] = useState()
    const { selectedChat, chats, setChats, user, setSelectedChat } = ChatState()



    const fetchAllChats = async () => {

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.get("api/chat", config)
            console.log("CHATS+++++", data);
            setChats(data)

        }
        catch (error) {
            alert(" 404 Error Could not fetch")
        }
    }

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
        fetchAllChats()
    }, [])


    return (

        <Box
            d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px" >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                d="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center">MyChats

                <Button d="flex" fontSize={{ base: "17px", md: "10px", lg: "17px" }} rightIcon={<AddIcon />}>
                    New Group Chat
                </Button>
            </Box>

            <Box
                d="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflow="hidden"
            >
                {chats ? (
                    <Stack overflowY='scroll'>
                        {

                            chats.map((chat) => (
                                <Box onClick={() => setSelectedChat(chat)}
                                    cursor="pointer"
                                    bg={selectedChat === chat ? "#38B2AC" : "#e8e8e8"}
                                    color={selectedChat === chat ? "white" : "black"}

                                    px={4}
                                    py={2}
                                    borderRadius="lg"
                                    key={chat._id}>
                                    <Text>
                                        {!chat.isGroupChat ? getSender(loggedUser, chat.users) : (chat.chatName)}
                                    </Text>


                                </Box>
                            ))
                        }

                    </Stack>
                ) : (<ChatLoading />)}

            </Box>
        </Box >

    )
}

export default MyChats