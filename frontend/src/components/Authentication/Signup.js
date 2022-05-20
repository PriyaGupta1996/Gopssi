import { FormControl, VStack, FormLabel, Input, InputRightElement, Button, InputGroup, toast } from '@chakra-ui/react'
import { React, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid';

//import { post } from '../../../../backend/routes/userRoutes'

import AWS from 'aws-sdk'

const S3_BUCKET = 'gopssi-profile-pictures';
const REGION = 'us-east-1';

AWS.config.update({
    accessKeyId: 'AKIAV7NZNQ4C22XFOZHC',
    secretAccessKey: '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'
})



const profilePictures = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

const uploadFile = () => {

    const fileName = uuidv4();
    const params = {
        Bucket: S3_BUCKET,
        Key: fileName
    };

    profilePictures.putObject(params).send((err) => {
        if (err) console.log(err)
    })
}


const Signup = () => {
    const [showPass, setShowPass] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState()
    const [loading, setLoading] = useState();
    const toast = useToast()

    const handleClickPass = () => {
        setShowPass(!showPass)
    }
    const handleClickConfirm = () => {
        setShowConfirm(!showConfirm)
    }
    const submitHander = () => {

    }
    const postDetails = (pics) => {
        setLoading(true)
        if (pics === undefined) {
            toast({
                title: "Please select an image",
                status: "warning",
                duration: "5000",
                isClosable: true,
                position: "center"
            })

            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            setLoading(true)
            uploadFile()
            setLoading(false)
        }

        else {
            toast({
                title: "Please select an image",
                status: "warning",
                duration: "5000",
                isClosable: true,
                position: "center"
            })
            setLoading(false)
            return
        } // api call
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
                onClick={submitHander}
                isLoading={loading}
            >
                Submit
            </Button>
        </VStack >
    )
}

export default Signup