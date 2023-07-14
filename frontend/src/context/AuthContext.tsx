import { createContext, useReducer, useEffect, ReactNode } from 'react';
import { Action, User } from '../types';

export interface AuthState {
    user: User | null;
}

export const AuthContext = createContext<{ state: AuthState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const authReducer = (state: AuthState, action: Action): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        
        case 'LOGOUT':
            return { user: null };
        
        default:
            return state;
    }
}

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const currUser = localStorage.getItem("user");
    
        if (currUser) {
            const user = JSON.parse(currUser);
            dispatch({type: 'LOGIN', payload: user});
        }
    }, [])

    console.log('AuthContext state:', state);

    const authContextValue = { state, dispatch };

    return (
        <AuthContext.Provider value={authContextValue}>
            { children }
        </AuthContext.Provider>
    );
}
