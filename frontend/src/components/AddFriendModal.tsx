import { Button, Modal, ModalOverlay, Text, ModalContent, ModalHeader, FormControl, ModalFooter, ModalBody, ModalCloseButton, FormLabel, Input, useDisclosure } from "@chakra-ui/react"
import { useState, useRef } from "react";

export default function AddFriendModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [friendToAdd, setfriendToAdd] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const initialRef = useRef(null);

    const onModalClose = () => {
      onClose();
      setError(null);
      setSuccess(false);
      setfriendToAdd("");
    }

    const handleSubmit = async (e: any) => {
      e.preventDefault()

      let currUsername = ""
      const currUser = localStorage.getItem("user");
  
      if (currUser) {
          const user = JSON.parse(currUser);
          currUsername = user.username;
      }

      const response = await fetch('/api/user/add-friend', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({currUsername, friendToAdd})
      })
      const json = await response.json()

      if (!response.ok) {
        setError(json.error)
      } else {
        setError(null);
        setSuccess(true);
        setfriendToAdd("");
      }
    }

    const handleChange = (e: any) => {
      setfriendToAdd(e.target.value); // Update the 'username' state with the input value
      console.log(friendToAdd)
    };
  
    return (
      <>
        <Button onClick={onOpen}>+ Add a Friend</Button>
  
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onModalClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a friend</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

              <FormControl>
                <FormLabel>Enter your friend's username: </FormLabel>
                <Input ref={initialRef} placeholder='eg. chattymonkey123' value={friendToAdd} onChange={handleChange}/>
                {error && <Text color="tomato">{error}</Text>}
                {success && <Text color="teal">Friend added successfully! Add another or close.</Text>}
              </FormControl>

            </ModalBody>
  
            <ModalFooter>
              <Button mr={3} onClick={onModalClose}>Close</Button>
              <Button colorScheme='teal' onClick={handleSubmit}>
                + Add Friend
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}