import React from 'react'

import { Button, Box, ModalOverlay, ModalContent, Modal, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter } from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios'
import UserListItem from '../UserAvatar/UserListItem'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'

const GroupChatModal = ({ children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState() //search group chat
    const [searchResult, setSearchResult] = useState([]) //group chat results
    const [loading, setLoading] = useState(false) //loader
    const { user, chats, setChats } = ChatState()

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((currUser) => currUser._id !== delUser._id))
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
    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            alert("Please fill all the fields")
            return
        }
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    // 'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post("/api/chat/group", { name: groupChatName, users: JSON.stringify(selectedUsers.map((u) => u._id)) }, config)
            console.log(data)
            setChats([data, ...chats])
            onClose()
            alert("New Group created")

        } catch (error) {
            alert(" Unsuccessful in created the chat")
        }


    }

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd))
            alert("The user is already selected")
        else {
            setSelectedUsers([...selectedUsers, userToAdd])
        }


    }


    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal

                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center">Create Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody d="flex" flexDir="column" alignItems="center" pb={6}>
                        <FormControl>
                            <Input placeholder='Chat Name'
                                mb={3}
                                onChange={(e) => setGroupChatName(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <Input placeholder=' Add Users eg: John,Priya,Jane'
                                mb={1}
                                onChange={(e) => handleSearch(e.target.value)} />
                        </FormControl>
                        <Box w="100%" d="flex" flexWrap="wrap">{
                            selectedUsers.map((u) => (<UserBadgeItem key={user._id} user={u} handleFunction={() => handleDelete(u)} />))
                        }</Box>

                        {loading ? <div>loading</div> : (searchResult?.slice(0, 4).map(user => (
                            <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                        )))}
                        {/* selected users
                        render the searched users */}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


export default GroupChatModal