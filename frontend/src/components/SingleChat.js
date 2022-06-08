import React from 'react'
import { Box, IconButton, Text } from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { ChatState } from '../Context/ChatProvider'
import { getSender, getSenderFull } from "../config/ChatLogics"
import ProfileModal from "../components/miscellaneous/ProfileModal"
import UpdateGroupChatModal from "../components/miscellaneous/UpdateGroupChatModal"
const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const { user, selectedChat, setSelectedChat } = ChatState()
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
                        d="flex" flexDir="column" justifyContent="flex-end" p={3} bg="#e8e8e8" w="100%" h="100%" borderRadius="lg" overflowY="hidden"> </Box>
                </>
                : <Box d="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans"> Click on a user to start chatting </Text></Box>}
        </>)
}

export default SingleChat