import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { ViewIcon } from "@chakra-ui/icons"
import React from 'react'

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {
                children ? <span onClick={onOpen}>{children}</span> : (<IconButton d={{ base: "flex" }} icon={<ViewIcon />} onclick={onOpen} />)
            }

            {/* <Button onClick={onOpen}>{user.name}</Button> */}

            <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="410px">
                    <ModalHeader
                        fontSize="30px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center">{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        d="flex"
                        flexDir="column"
                        alignItems="center"
                        justifyContent="space-between">

                        <Image borderRadius="full"
                            boxSize="150px"
                            src={user.pic}
                            alt={user.name} />
                        <Text fontSize={{ base: "20px", md: "22px" }}
                            fontFamily="Work sans">Email : {user.email}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal