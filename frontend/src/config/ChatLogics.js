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

export { getSender, getSenderFull }