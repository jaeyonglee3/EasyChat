import { useAuthContext } from "./useAuthContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const useSignup = () => {
    const { dispatch } = useAuthContext()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate() 

    const signup = async (username: string, password: string) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })

        const json = await response.json()  // will either return info w/ JWT or an error message if unsucessful

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            // save the user to local storage (JWT and username) so that they stay logged in
            // JWT and username are sent back to us after a sign up request (see user controllers)
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context for the react app
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)

            // Send the user to the /home route
            navigate('/home')
        }
    }

    return { signup, isLoading, error }  // These are the things we can grab from the hook
}