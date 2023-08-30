import { useState } from "react"

export const useGetConvo = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getConvo = async (participant1: string, participant2: string) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`/api/conversation/get-conversation?participant1=${participant1}&participant2=${participant2}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })

        const json = await response.json()  // will either return info w/ JWT or an error message if unsucessful

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            const conversation = JSON.stringify(json)
            setIsLoading(false)
            return conversation
        }
    }

    return { getConvo, isLoading, error }  // These are the things we can grab from the hook
}