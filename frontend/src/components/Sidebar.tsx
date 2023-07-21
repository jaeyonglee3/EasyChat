import { Heading, Button, Box, Divider, useColorMode, VStack, Flex, Icon, HStack, Spacer, Stack } from "@chakra-ui/react"
import { useLogout } from "../hooks/useLogout"
import { AddFriendModal } from "./AddFriendModal"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import React from "react"
import { CgProfile } from 'react-icons/cg'
import { BiLogOutCircle } from 'react-icons/bi'

export const Sidebar = () => {
    let username = ""
    const currUser = localStorage.getItem("user");
    const { logout } = useLogout()

    if (currUser) {
        const user = JSON.parse(currUser);
        username = user.username;
    }

    const { colorMode } = useColorMode();
    const sidePanelBgColor = colorMode === "light" ? "gray.200" : "gray.800";
    const sidePanelBorderColor = colorMode === "light" ? "gray.300" : "gray.700";

    return (
        <div>
            <Box w="20%" h="100vh" p={5} borderRight='4px' borderColor={sidePanelBorderColor} bg={sidePanelBgColor}>
                
                <Flex flexDirection="column" h="100%">
                    <HStack>
                        <Heading fontSize="2xl">Chats</Heading>
                        <Spacer></Spacer>
                        <ColorModeSwitcher />
                    </HStack>

                    <VStack flex="1" justifyContent="flex-end"> {/* Use flex="1" to make it take the remaining height */}
                        <Divider mb={5}/>
                        <Heading fontSize="2xl">
                            <Flex align="center"> {/* Use Flex with align="center" */}
                                <Icon as={CgProfile} mr={2} /> {username}
                            </Flex>
                        </Heading>
                        <HStack>
                            <Stack direction='row' spacing={4}>
                                <Button onClick={() => logout()} leftIcon={<BiLogOutCircle />} >
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