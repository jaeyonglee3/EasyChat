import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const navigate = useNavigate() 

    const logout = () => {
        // The global user auth state and JWT in local storage must change
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        navigate('/')
    }

    return {logout}
}