import { Box, Center, FormControl, Button, Input, Heading, Icon, Flex, Text } from '@chakra-ui/react';
import { CgProfile } from 'react-icons/cg'
import { useFriendContext } from '../context/FriendContext';
import { useEffect, useRef } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useGetConvo } from '../hooks/useGetConvo'
import { useSocket } from '../hooks/useSocket'
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
  const [message, setMessage] = useState('');
  const convoContainerRef = useRef<HTMLDivElement | null>(null);
  const {getConvo, error, isLoading} = useGetConvo()
  const { selectedFriend } = useFriendContext();
  const socket = useSocket();
  const currUser = localStorage.getItem("user");

  let currUsername = ""
  if (currUser) {
      const user = JSON.parse(currUser);
      currUsername = user.username;
    }
    
  const formatDate = (dateString: any) => {
    const formattedDate = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    
    return formattedDate.toLocaleString("en-US", options);
  };  
  
  const handleSendMessage = async () => {
    if (message.trim() === '') return; 
    console.log("this is it: ", convo)

    const messageData = {
      sender: currUsername, 
      content: message,
      timestamp: new Date(),
      conversationId: convo?.id, 
    };

    if (convo !== null) {
      socket.emit('message', messageData);
      console.log(messageData.content)
    } else {
      console.log("conversation is null")
      // const response = await fetch('/api/conversation/create-conversation', {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({currUsername, selectedFriend})
      // })
      // const json = await response.json()

      // if (!response.ok) {
      //   console.log(json.error)
      // } else {
      //   fetchConvo()
      // }
    }

    setMessage(''); 
  };

  const fetchConvo = async () => {
    try {
      const conversation = await getConvo(currUsername, selectedFriend!);
      if (conversation) {
        const parsedConversation = JSON.parse(conversation);
        setCurrConvo(parsedConversation);
        socket.emit('joinRoom', parsedConversation.id); 
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (selectedFriend !== null) {
      fetchConvo();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFriend]); 
  
  useEffect(() => {
    if (socket) {
      socket.on('message', (messageData) => {
        const newMessage = {
          sender: messageData.sender,
          content: messageData.content,
          timestamp: messageData.timestamp,
        };

        if (convo) {
          const newConvo = {
            ...convo,
            messages: convo.messages ? [...convo.messages, newMessage] : [newMessage],
          };
          setCurrConvo(newConvo as Conversation);
        }
               
      });
    }
  }, [socket, convo]);

  useEffect(() => {
    if (convoContainerRef.current) {
      convoContainerRef.current.scrollTop = convoContainerRef.current.scrollHeight;
    }
  }, [convo]);

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

          <Box h="100%">
            {convo && (
              <>
                Last chat:&nbsp;
                {convo.messages.length !== 0 && formatDate(convo.messages[convo.messages.length - 1].timestamp)}
                {error && <Text>{error}</Text>}
              </>
            )}
          </Box>

          {/* Render messages here */}
          <Flex flex="1" flexDirection="column" justify="flex-end">
            <Box ref={convoContainerRef} overflowY="scroll" flexGrow={1} maxHeight="calc(100vh - 200px)">
              {convo &&
                convo.messages.map((message, index) => (
                  <Flex flexDirection="row" justifyContent={message.sender === currUsername ? "flex-end" : "flex-start"}>
                    <Box
                      key={index}
                      bg={message.sender === currUsername ? "cyan.300" : "gray.200"}
                      // color={message.sender === currUsername ? "white" : "black"}
                      color="black"
                      borderRadius="10px"
                      p="10px"
                      my="5px"
                      width={"-webkit-fit-content"}
                      maxWidth='50%'
                    >
                      {message.content}
                    </Box>
                  </Flex>
                ))}
            </Box>
          </Flex>
          
          <Flex flex="1" flexDirection="column" justify="flex-end" mt="15px">
            <FormControl>
            <Input
              w="90%"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message @${selectedFriend}`}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
              <Button disabled={isLoading} leftIcon={<AiOutlineSend />} color='black' backgroundColor="cyan.300" ml="10px" variant="outline" onClick={handleSendMessage}>
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
