import { 
    Box, 
    Button, 
    Link, 
    Text, 
    Container,  
    FormControl, 
    FormLabel, 
    Heading, 
    Input, 
    InputGroup, 
    InputRightElement 
} from "@chakra-ui/react"
import React from "react"
import { useState } from "react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom';

export const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        console.log(username, password)
    }

    return (
        <div>
            <Box display="flex" alignItems="center" justifyContent="flex-end" p={4}>
                <ColorModeSwitcher />
            </Box>

            <Container h="80vh" maxW="2xl" centerContent display="flex" justifyContent="center" alignItems="center">
                <Box w='60%' textAlign="center">
                    <Heading textAlign="center">Welcome to EasyChat!</Heading>
                    <Text textAlign="center">Sign Up</Text>

                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel pt={7}>Username</FormLabel>
                            <Input 
                                placeholder='eg. chattymonkey123' 
                                _placeholder={{ opacity: 1, color: 'gray.600' }}
                                type='username' 
                                onChange={(e) => setUsername(e.target.value)} 
                                value={username}
                            />

                            <FormLabel pt={7}>Password</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                _placeholder={{ opacity: 1, color: 'gray.600' }}
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password}
                                />
                                <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                                </InputRightElement>
                            </InputGroup>

                            <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline' type="submit" mt={7}>
                                Sign Up
                            </Button>
                        </FormControl>
                    </form>

                    <Text pt={7} textAlign="center" fontSize="sm">
                        Already have an account? Log in{' '}
                        <Link as={RouterLink} to="/" color="blue.500">
                            here
                        </Link>
                        .
                    </Text>
                </Box>
            </Container>
        </div>
    )
}