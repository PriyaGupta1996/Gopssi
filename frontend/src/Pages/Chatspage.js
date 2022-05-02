import React, { useEffect, useState } from 'react'
import axios from "axios"

const Chatspage = () => {

    const [chats, setChats] = useState([])
    const fetchChats = async () => {
        const { data } = await axios.get("/api/chat")
        setChats(data)
    }
    useEffect(() => {
        fetchChats()
        console.log(chats)
    }, []) //check if you can have chats in this array as when i did before, it was a infite useeffect calls


    return (
        <div>
            {chats.map(chat => <div key={chat._id}>{chat.chatName}</div>)}
        </div>
    )
}

export default Chatspage