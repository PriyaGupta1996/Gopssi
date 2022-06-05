import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ChatState } from '../Context/ChatProvider'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/miscellaneous/miscellaneous'
import ChatBox from '../components/miscellaneous/ChatBox'
import { Box } from '@chakra-ui/react'

const Chatspage = () => {
    const { user } = ChatState()


    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box d="flex"
                justifyContent='space-between'
                w='100%'
                h='91.5vh'
                p='10'>
                {user && <MyChats />}
                {user && <ChatBox />}
            </Box>
        </div>
    )

}
export default Chatspage