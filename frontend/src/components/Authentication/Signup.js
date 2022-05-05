import { FormControl, VStack, FormLabel, Input, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
import { React, useState } from 'react'

const Signup = () => {
    const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();

    const handleClickPass = () => {
        setShowPass(!showPass)
    }
    const handleClickConfirm = () => {
        setShowConfirm(!showConfirm)
    }
    const submitHander = () => {

    }
    const postDetails = () => {

    }

    return (
        <VStack spacing="5px">
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder="Enter Your Name"
                    onChange={(e) => { setName(e.target.value) }}
                />
            </FormControl>

            <FormControl id='Email' isRequired>
                <FormLabel>Email Id</FormLabel>
                <Input
                    placeholder="Enter Your Email Id"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
            </FormControl>


            <FormControl id='Pass' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>

                    <Input
                        type={showPass ? "text" : "password"}
                        placeholder="Enter Your Password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClickPass}>
                            {showPass ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='RePass' isRequired>
                <FormLabel>Confirm Your Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re Enter your password"
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClickConfirm}>
                            {showConfirm ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>

            </FormControl>
            <FormControl id='Photo' isRequired>
                <FormLabel>Upload Your Photo</FormLabel>
                <Input
                    type="file"
                    placeholder="Upload"
                    accept='image/*'
                    onChange={(e) => { postDetails(e.target.files[0]) }}
                />
            </FormControl>

            <Button
                w="100%"
                colorScheme="blue"
                style={{ marginTop: 15 }}
                onClick={submitHander} f
            >
                Submit
            </Button>
        </VStack>
    )
}

export default Signup