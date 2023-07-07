import { Heading } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"

export const Home = () => {
    return (
        <div>
            <Heading>Welcome to the app!</Heading>
            <ColorModeSwitcher />
        </div>
    )
}