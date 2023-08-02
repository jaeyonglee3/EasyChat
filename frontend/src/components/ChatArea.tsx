import { Box, Center, Text } from '@chakra-ui/react';
import { useFriendContext } from '../context/FriendContext';
import { useEffect } from 'react';

const ChatArea = () => {
  const { selectedFriend } = useFriendContext();
  useEffect(() => {}, [selectedFriend]); 

  return (
    <Box w="80vw" h="100vh" p="30px">
      <Center h='100%' color='white'>
        <Text>Select a conversation to get started :D You have selected: {selectedFriend && selectedFriend}</Text>
      </Center>
    </Box>
  );
};

export default ChatArea;
