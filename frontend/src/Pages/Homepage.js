import React from 'react'
import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Login from "../components/Authentication/Login.js"
import Signup from "../components/Authentication/Signup.js"
const Homepage = () => {
    return (
        <Container maxW='xl' centerContent>
            <Box
                d="flex"
                justifyContent="center"
                p={3} //padding
                bg="white"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                {/* similar like div */}
                <Text
                    fontSize="4xl"
                    fontFamily="Work sans"
                >Gossip on GoPssi</Text>
            </Box>
            <Box
                p={4} //padding
                bg="white"
                w="100%"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Tabs variant='soft-rounded'>
                    <TabList mb="1em">
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p><Login /></p>
                        </TabPanel>
                        <TabPanel>
                            <p><Signup /></p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </Box>

        </Container >
    )
}

export default Homepage