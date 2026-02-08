'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { loginUser, getCurrentUser } from '@/services/database';

interface AuthContextType {
    user: User | null;
    login: (email: string) => Promise<User>;
    setUser: (user: User) => void;
    logout: () => void;
    isLoading: boolean;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

const STORAGE_KEY = 'hms_current_user';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUserState] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session
        const storedUserId = localStorage.getItem(STORAGE_KEY);
        if (storedUserId) {
            getCurrentUser(storedUserId).then(user => {
                if (user) {
                    setUserState(user);
                }
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = async (email: string): Promise<User> => {
        setIsLoading(true);
        try {
            const loggedInUser = await loginUser(email);
            setUserState(loggedInUser);
            localStorage.setItem(STORAGE_KEY, loggedInUser.id);
            return loggedInUser;
        } finally {
            setIsLoading(false);
        }
    };

    const setUser = (newUser: User) => {
        setUserState(newUser);
        localStorage.setItem(STORAGE_KEY, newUser.id);
    };

    const logout = () => {
        setUserState(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    const refreshUser = async () => {
        if (user?.id) {
            const freshUser = await getCurrentUser(user.id);
            if (freshUser) {
                setUserState(freshUser);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, setUser, logout, isLoading, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};
