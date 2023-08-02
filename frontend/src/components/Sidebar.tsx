import { Heading, Button, Box, Divider, useColorMode, VStack, Flex, Icon, HStack, Spacer, Stack, Text } from "@chakra-ui/react"
import { useLogout } from "../hooks/useLogout"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import AddFriendModal from "./AddFriendModal"
import React, { useState, useEffect } from "react"
import { CgProfile } from 'react-icons/cg'
import { BiLogOutCircle } from 'react-icons/bi'

export default function Sidebar() {
    const [friends, setFriends] = useState([]);
    let username = ""
    const currUser = localStorage.getItem("user");
    const { logout } = useLogout()

    if (currUser) {
        const user = JSON.parse(currUser);
        username = user.username;
    }
    
    useEffect(() => {
        const getFriends = async () => {
            const response = await fetch(`/api/user/get-friends?username=${username}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
              });
        
            const data = await response.json();
            return data.friends; 
        };
        getFriends().then(friendsData => {
            setFriends(friendsData);
        });
    }, [username]);

    const { colorMode } = useColorMode();
    const colour1 = colorMode === "light" ? "gray.200" : "gray.800";
    const colour2 = colorMode === "light" ? "gray.300" : "gray.700";

    return (
        <div>
            <Box w="20vw" h="100vh" p={5} borderRight='4px' borderColor={colour2} bg={colour1}>
                
                <Flex flexDirection="column" h="100%">
                    <HStack>
                        <Heading fontSize="2xl">Chats</Heading>
                        <Spacer></Spacer>
                        <ColorModeSwitcher />
                    </HStack>

                    <VStack flex="1" justifyContent="flex-end"> 

                        <Box bg={colour2} flex="1" w="100%" maxHeight="75vh" overflowY="auto" borderRadius="10px" p="15px" alignContent="center">
                            <VStack align="stretch"> {/* Wrap the Box with VStack */}
                                {Array.isArray(friends) && friends.map((friend, index) => (
                                    <Button key={index} borderRadius="10px">{friend}</Button> 
                                ))}
                            </VStack>
                        </Box>

                        <Divider mb={5}/>
                        <Heading fontSize="2xl">
                            <Flex align="center"> 
                                <Icon as={CgProfile} mr={2} /> {username}
                            </Flex>
                        </Heading>
                        <HStack>
                            <Stack direction='row' spacing={4}>
                                <Button onClick={() => logout()} leftIcon={<BiLogOutCircle />} colorScheme='teal'>
                                    Logout
                                </Button>
                            </Stack>
                            <AddFriendModal />
                        </HStack>
                    </VStack>
                </Flex>

            </Box>
        </div>
    )
}