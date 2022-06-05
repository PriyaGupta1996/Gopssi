const getSender = (loggedUser, users) => {
    return users.filter((user) => {
        return user._id !== loggedUser._id
    })[0].name
}

export default getSender