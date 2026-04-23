import React, { createContext, useContext, useState, ReactNode } from 'react';
import { loadUser, saveUser, UserData } from 'services/storageService';

interface UserContextType {
    user: UserData;
    updateUser: (updates: Partial<UserData>) => void;
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<UserData>(loadUser());
    const [isLoading, setIsLoading] = useState(false);

    const updateUser = (updates: Partial<UserData>) => {
        setUserState(prev => {
            const newState = { ...prev, ...updates };
            saveUser(newState);
            return newState;
        });
    };

    return (
        <UserContext.Provider value={{ user, updateUser, isLoading, setLoading: setIsLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
