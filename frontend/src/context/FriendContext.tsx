import React, { createContext, useState, useContext, ReactNode } from 'react';

// interface Friend {
//   username: string;
// }

interface FriendContextValue {
  selectedFriend: string | null;
  setSelectedFriend: (friend: string | null) => void;
}

// Create a context object
const FriendContext = createContext<FriendContextValue>({
  selectedFriend: null,
  setSelectedFriend: () => {},
});

// This creates a custom hook named useFriendContext.
// It uses the useContext hook to consume the FriendContext and return its value, which is of type FriendContextValue.
export const useFriendContext = () => useContext(FriendContext);


interface AuthContextProviderProps {
    children: ReactNode;
}

// Higher-level component that provides the FriendContext value
export const FriendContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  
    return (
      <FriendContext.Provider value={{ selectedFriend, setSelectedFriend }}>
        {children}
      </FriendContext.Provider>
    );
  };

export default FriendContext;
