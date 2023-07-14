import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        // The global user auth state and JWT in local storage must change
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}