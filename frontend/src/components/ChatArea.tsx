import { Box, Center, FormControl, Button, Input, Heading, Icon, Flex, Text } from '@chakra-ui/react';
import { CgProfile } from 'react-icons/cg'
import { useFriendContext } from '../context/FriendContext';
import { useEffect } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

const ChatArea = () => {
  const { selectedFriend } = useFriendContext();
  useEffect(() => {}, [selectedFriend]); 

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

          <Box h="100%"> Last online: 08/05/2023 @ 2:13 PM </Box>
          
          <Flex flex="1" flexDirection="column" justify="flex-end">
            <FormControl>
              <Input w="90%" placeholder={`Message @${selectedFriend}`} />
              <Button leftIcon={<AiOutlineSend />} colorScheme='teal' ml="10px" variant="outline">
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
