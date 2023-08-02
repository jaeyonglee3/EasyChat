import { Box, Center, useColorMode, Text } from '@chakra-ui/react';
import { useFriendContext } from '../context/FriendContext';
import { useEffect } from 'react';

const ChatArea = () => {
  const { selectedFriend } = useFriendContext();
  useEffect(() => {}, [selectedFriend]); 

  // const { colorMode } = useColorMode();
  // const colour1 = colorMode === "light" ? "gray.200" : "gray.800";

  return (
    <Box w="80vw" h="100vh" p="30px">
      {selectedFriend === null && (
        <Center h='100%'>
          <Text>Select a conversation to get started :D</Text>
        </Center>
      )}
      <Text>{selectedFriend}</Text>
    </Box>
  );
};

export default ChatArea;
