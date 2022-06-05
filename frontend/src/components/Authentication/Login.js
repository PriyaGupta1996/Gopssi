import { FormControl, VStack, FormLabel, Input, InputRightElement, Button, InputGroup } from '@chakra-ui/react'
import { React, useState } from 'react'
import { useHistory } from "react-router-dom"
import axios from "axios"

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false);
    const history = useHistory()


    const submitHander = async () => {
        setLoading(true)
        if (!email || !password) {
            // toast({
            //     title: "Please fill all the fields",
            //     status: "warning",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "center"
            // })
            alert("Please fill all the fields")
            setLoading(false)
            return
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const { data } = await axios.post("/api/user/login", { email, password }, config)
            // console.log(error)
            // toast({
            //     title: "Successfully registered the user",
            //     status: "success",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "center"
            // })
            alert("Successfully logged in")
            localStorage.setItem("userInfo", JSON.stringify(data))
            setLoading(false)
            history.push("/chats")
        }
        catch (error) {

            // toast({
            //     title: "Please try again after sometime",
            //     description: error.response.data.message,
            //     status: "error",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "center"
            // })
            alert(error.response.data.message)
            setLoading(false)

        }

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
            >Login</Button>
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