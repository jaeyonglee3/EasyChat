import { createContext, useReducer, ReactNode } from 'react';
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

    console.log('AuthContext state:', state);

    const authContextValue = { state, dispatch };

    return (
        <AuthContext.Provider value={authContextValue}>
            { children }
        </AuthContext.Provider>
    );
}
