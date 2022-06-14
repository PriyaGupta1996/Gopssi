import { ModalBody, Modal, ModalCloseButton, ModalContent, IconButton, useDisclosure, ModalHeader, ModalFooter, Button, Box, FormControl, Input } from '@chakra-ui/react'
import { React, useState } from 'react'
import { ViewIcon } from "@chakra-ui/icons"
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from "../UserAvatar/UserBadgeItem"
import UserListItem from '../UserAvatar/UserListItem'
import axios from 'axios'
const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessage }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { selectedChat, setSelectedChat, user } = ChatState()
    const [selectedUsers, setSelectedUsers] = useState(selectedChat.users)
    const [groupChatName, setGroupChatName] = useState()
    const [search, setSearch] = useState() //search group chat
    const [searchResult, setSearchResult] = useState([]) //group chat results
    const [loading, setLoading] = useState(false) //loader
    const [renameLoading, setRenameLoading] = useState(false) //

    // const handleRemove = async (userToRemove) => {
    //     if (!userToRemove)
    //         return
    //     if (userToRemove._id !== user._id || selectedChat.groupAdmin._id !== userToRemove._id) {
    //         alert("Only Admins can remove the users")
    //         return
    //     }
    //     try {
    //         setLoading(true)
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${user.token}`
    //             }
    //         }
    //         const { data } = await axios.put("/api/chat/groupRemove", { chatId: selectedChat._id, userID: userToRemove._id }, config)
    //         setSelectedChat(data)
    //         setFetchAgain(!fetchAgain)
    //         setLoading(false)


    //     } catch (error) {
    //         alert(error.response.data.message)
    //         setLoading(false)
    //     }



    // }
    const handleAddUser = async (userToAdd) => {
        // if (selectedUsers.find((u) => u._id === userToAdd._id)) {
        //     alert("The user is already in the group")
        //     return
        // }
        // if (selectedChat.groupAdmin._id !== user._id) {
        //     alert("Only Admin can add the user")
        //     return
        // }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.put("/api/chat/groupAdd", { chatId: selectedChat._id, userId: userToAdd._id }, config)
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setLoading(false)


        } catch (error) {
            alert(error.response.data.message)
            setLoading(false)
        }



    }
    const handleRename = async () => {
        if (!groupChatName) {

            return
        }
        try {
            setRenameLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.put("/api/chat/rename", { chatId: selectedChat._id, chatName: groupChatName }, config)
            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setRenameLoading(false)


        } catch (error) {
            alert(error.response.data.message)
            setRenameLoading(false)
        }
        setGroupChatName("")
    }
    const handleSearch = async (query) => {

        setSearch(query)
        if (!query) {
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get(`/api/user?search=${search}`, config)
            console.log(data)
            setLoading(false)
            setSearchResult(data)


        } catch (error) {
            alert("Failed to load the search results")
        }
    }
    const handleRemove = async (userToRemove) => {
        // // console.log("LoggedINNN", user)
        // // console.log("selectedChat", selectedChat)
        // // console.log("toremoveuser", userToRemove)

        // console.log("user_logged", typeof user._id)
        // console.log("Adminnnn", typeof selectedChat.groupAdmin)
        // // console.log("heyyyyAdmin", tempGroupAdmin._id)
        // if (selectedChat.groupAdmin._id !== user._id) {
        //     alert("Only Admins can remove the users")
        //     return
        // }

        // if (userToRemove._id !== user._id) {
        //     alert("Not permissible action")
        //     return
        // }

        try {
            console.log("trying")
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.put("/api/chat/groupRemove", { chatId: selectedChat._id, userId: userToRemove._id }, config)
            userToRemove._id === user._id ? setSelectedChat() : setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            fetchMessage()
            setSelectedUsers(data.users)
            setLoading(false)


        } catch (error) {
            alert(error.response.data.message)
            setLoading(false)
        }



    }
    return (
        <>
            <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center" >{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            d="flex"
                            w="100%"
                            flexWrap="wrap"
                            pb={3}>
                            {selectedChat.users.map(u =>
                                (<UserBadgeItem key={user._id} user={u} handleFunction={() => handleRemove(u)} />))}
                        </Box>
                        <FormControl d="flex">
                            <Input placeholder="Chat Name"
                                mb={3}
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                ml={1}
                                isLoading={renameLoading}
                                onClick={handleRename}
                            >Update</Button>

                        </FormControl>
                        <FormControl d="flex">
                            <Input placeholder="Add Users to group"
                                mb={3}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                ml={1}
                                isLoading={loading}
                                onClick={handleRename}
                            >Add Users</Button>

                        </FormControl>

                        {loading ? <div>Please wait..</div> : (searchResult?.slice(0, 4).map(user => (
                            <UserListItem key={user._id} user={user} handleFunction={() => handleAddUser(user)} />
                        )))}


                    </ModalBody>
                    <ModalFooter>
                        <Button cursor="pointer" colorScheme="red" mr={3} onClick={() => handleRemove(user)}>Leave Group</Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>



        </>
    )
}

export default UpdateGroupChatModal