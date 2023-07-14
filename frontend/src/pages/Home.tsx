import { Heading, Button } from "@chakra-ui/react"
import { useLogout } from "../hooks/useLogout"
import React from "react"

export const Home = () => {
    let username = ""
    const currUser = localStorage.getItem("user");
    const { logout } = useLogout()

    if (currUser) {
        const user = JSON.parse(currUser);
        username = user.username;
    }

    return (
        <div>
            <Heading>Currently logged in: {username}</Heading>
            <Button onClick={() => logout()}>Logout</Button>
        </div>
    )
}