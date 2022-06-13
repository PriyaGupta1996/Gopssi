import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../../Context/ChatProvider'

const UserListItem = ({ user, handleFunction }) => {
    console.log(user._id)
    return (
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="#E8E8E5"
            _hover={{
                background: "#38B2aC",
                color: "white"
            }}

            w="100%"
            d="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Avatar
                mr={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b> Email : </b>{user.email}
                </Text>
            </Box>
        </Box >
    )
}

export default UserListItem