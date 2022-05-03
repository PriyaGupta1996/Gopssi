import { FormControl, VStack, FormLabel, Input, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
import { React, useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPass, setShowPass] = useState(false)


    const submitHander = () => {

    }
    const handleClickPass = () => {
        setShowPass(!showPass)
    }


    const Guestlogin = () => {
        setEmail("guest@example.com")
        setPassword("123456")
        document.getElementById("Email").value = email
        document.getElementById("Pass").value = password
    }
    return (
        <VStack spacing="5px">
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




            <Button
                w="100%"
                colorScheme="blue"
                style={{ marginTop: 15 }}
                onClick={submitHander}
            >
                Submit
            </Button>
            <Button
                w="100%"
                colorScheme="green"
                style={{ marginTop: 15 }}
                onClick={Guestlogin}
            >
                Use Guest Credentials
            </Button>
        </VStack >
    )
}

export default Login