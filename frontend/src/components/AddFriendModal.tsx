import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, FormControl, ModalFooter, ModalBody, ModalCloseButton, FormLabel, Input, useDisclosure } from "@chakra-ui/react"
import React from "react"

export function AddFriendModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
  
    return (
      <>
        <Button onClick={onOpen}>+ Add a Friend</Button>
  
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a friend</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input ref={initialRef} placeholder='eg. chattymonkey123' />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button mr={3} onClick={onClose}>Cancel</Button>
              <Button colorScheme='blue'>
                Add Friend
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}