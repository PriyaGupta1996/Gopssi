import { Box, Button, MenuButton, Text, Tooltip, Menu, Avatar, MenuList, MenuItem, MenuDivider, DrawerOverlay, DrawerContent, Drawer, DrawerHeader, DrawerBody, Input, Spinner } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { React, useState } from 'react'
import { useHistory } from "react-router-dom"
import { ChatState } from "../../Context/ChatProvider"
import ProfileModal from './ProfileModal'
import { useDisclosure } from '@chakra-ui/hooks'
import axios from 'axios'
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserAvatar/UserListItem'
import { getSender } from '../../config/ChatLogics'
import NotificationBadge, { Effect } from "react-notification-badge"


const SideDrawer = () => {
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()
    const { user, setSelectedChat, chats, setChats, notifications, setNotifications } = ChatState()
    const history = useHistory()
    const { isOpen, onClose, onOpen } = useDisclosure()
    console.log("notification:", notifications)
    const logoutHandler = () => {
        localStorage.removeItem("userInfo")
        history.push("/")
    }
    const handleSearch = async () => {
        if (!search) {
            alert("Please enter something to begin the search")
        }

        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.get(`/api/user?search=${search}`, config)
            setLoading(false)
            setSearchResult(data)
            console.log("result", searchResult)

        } catch (error) {

            alert("Error occurred, failed to load the search results")

        }

    }

    const accessChat = async (userId) => {
        console.log("selected user", userId)

        try {
            setLoading(true)
            const config = {
                "Content-type": 'application/json',
                headers: { 'Authorization': 'Bearer ' + user.token }
            }

            const { data } = await axios.post("/api/chat", { userId }, config)

            //  console.log("hellllooo friends", data)
            if (!chats.find((c) => c._id === data._id))
                setChats([data, ...chats])

            setSelectedChat(data)
            setLoading(false)
            onClose() //closing the side drawer when chat is fetched


        } catch (error) {

            console.log(error.message)
        }
    }
    return (
        <>
            <Box
                d="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px">
                <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
                    <Button variant="ghost" onClick={onOpen}><i class="fa fa-search"></i> <Text d={{ base: "none", md: "flex" }} px="4"> Search User</Text></Button>
                </Tooltip>
                <Text>Gossip-ON-Gopssi</Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <NotificationBadge
                                count={notifications.length}
                                effect={Effect.SCALE} />
                            < BellIcon font="2xl" m={1} />
                        </MenuButton>
                        <MenuList pl={2}>
                            {!notifications.length && "No new Messages"}
                            {notifications.map(notify => (
                                <MenuItem key={notify.id} onClick={() => {
                                    setSelectedChat(notify.chat);
                                    setNotifications(notifications.filter((n) => n !== notify))
                                }}>
                                    {notify.chat.IsGroupChat ? `New Message from ${notify.chat.chatName}` : `New Message from ${getSender(user, notify.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>

            </Box>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px"> Search Users </DrawerHeader>
                    <DrawerBody>
                        <Box d="flex" pb={2}>
                            <Input
                                placeholder='Search by name or email'
                                mr={2}
                                value={search}  // controlled input
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button
                                onClick={handleSearch}
                            >Go</Button>
                        </Box>

                        {loading ? (<ChatLoading />) : (searchResult?.map(user => (
                            <UserListItem
                                key={user._id}
                                user={user}
                                handleFunction={() => accessChat(user._id)}

                            />
                        )))}

                    </DrawerBody>
                    {loadingChat && <Spinner ml="auto" d="flex" />}


                </DrawerContent>
            </Drawer>

        </>
    )
}

export default SideDrawer