const getSender = (loggedUser, users) => {
    return users.filter((user) => {
        return user._id !== loggedUser._id
    })[0].name
}

const getSenderFull = (loggedUser, users) => {
    return users.filter((user) => {
        return user._id !== loggedUser._id
    })[0]
}

const isSameSender = (messages, m, i, userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id || messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    )
}

//last message of the opp user
const isLastMessage = (messages, i, userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    )
}

const isSameSenderMargin = (messages, m, i, userId) => {
    if (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id === m.sender._id) &&
        messages[i].sender._id !== userId
    )
        return 33;

    else if ((i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id) &&
        messages[i].sender._id !== userId) || (i === messages.length - 1 && messages[i].sender._id !== userId))
        return 0;

    else
        return "auto"

}

const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id
}

export { getSender, getSenderFull, isSameSender, isLastMessage, isSameUser, isSameSenderMargin }