import { Box, Center, FormControl, Button, Input, Heading, Icon, Flex, Text } from '@chakra-ui/react';
import { CgProfile } from 'react-icons/cg'
import { useFriendContext } from '../context/FriendContext';
import { useEffect } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useGetConvo } from '../hooks/useGetConvo'
import { useState } from "react"

interface Conversation {
  id: string;
  messages: {
    sender: string;
    content: string;
    timestamp: string;
    _id: string;
  }[];
}

const ChatArea = () => {
  const [convo, setCurrConvo] = useState<Conversation | null>(null);

  let currUsername = ""
  const currUser = localStorage.getItem("user");
  if (currUser) {
      const user = JSON.parse(currUser);
      currUsername = user.username;
  }

  const {getConvo, error, isLoading} = useGetConvo()

  const { selectedFriend } = useFriendContext();

  useEffect(() => {
    if (selectedFriend !== null) {
      const fetchConvo = async () => {
        try {
          const conversation = await getConvo(currUsername, selectedFriend);
          if (conversation) {
            setCurrConvo(JSON.parse(conversation));
          }
        } catch (error) {
          console.log(error)
        }
      };
      fetchConvo();
    }
  }, [selectedFriend]);

  // const { colorMode } = useColorMode();
  // const colour1 = colorMode === "light" ? "gray.200" : "gray.800";

  return (
    <Box w="80vw" h="100vh" p="40px">
      {selectedFriend === null ? (
        <Center h='100%'>
          <Text>Select a conversation to get started :D</Text>
        </Center>
      ) : (
        <Flex flexDirection="column" h="100%">
          <Heading fontSize="2xl">
            <Flex align="center"> 
              <Icon as={CgProfile} mr={2} /> {selectedFriend}
            </Flex>
          </Heading>

          {/* As a test for now, display the conversation ID under the friend's name */}
          <Box h="100%"> test {convo && convo.id} {error && <Text>{error}</Text>} </Box>

          {/* Render messages here */}
          <Flex flex="1" flexDirection="column" justify="flex-end">
            <Box overflowY="auto" flexGrow={1}>
              {convo &&
                convo.messages.map((message, index) => (
                  <Flex flexDirection="row" justifyContent={message.sender === currUsername ? "flex-end" : "flex-start"}>
                    <Box
                      key={index}
                      bg={message.sender === currUsername ? "teal.400" : "gray.200"}
                      color={message.sender === currUsername ? "white" : "black"}
                      borderRadius="10px"
                      p="10px"
                      my="5px"
                      width={"-webkit-fit-content"}
                    >
                      {message.content}
                    </Box>
                  </Flex>
                ))}
            </Box>
          </Flex>
          
          
          <Flex flex="1" flexDirection="column" justify="flex-end" mt="15px">
            <FormControl>
              <Input w="90%" placeholder={`Message @${selectedFriend}`} />
              <Button disabled={isLoading} leftIcon={<AiOutlineSend />} colorScheme='teal' ml="10px" variant="outline">
                Send
              </Button>
            </FormControl>
          </Flex>
        </Flex>
      )}
    </Box>
  );
 
};

export default ChatArea;
