import { createContext, useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

const ChatContext = createContext()

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState() //logged in user
    const [selectedChat, setSelectedChat] = useState() //selected chat
    const [chats, setChats] = useState([]) //all chats

    const history = useHistory()


    useEffect(() => {
        console.log(history)
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)
        if (!userInfo) {
            history.push('/')
        }

    }, [history])


    return <ChatContext.Provider value={{
        user, setUser, setSelectedChat, chats, selectedChat, setChats
    }}>{children}</ChatContext.Provider>
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider