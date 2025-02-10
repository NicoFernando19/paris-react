import { deleteCookie, getCookie } from 'cookies-next';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    setAuth: () => void;
    removeAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const validateAuth = () => {
            const token = getCookie('accessToken');
            if(token) 
            {
                setIsAuthenticated(true)
                
            } 
            else 
            {
                setIsAuthenticated(false)
            }
        }

        validateAuth()
    }, [])

    const setAuth = () => setIsAuthenticated(true);
    const removeAuth = () => {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        setIsAuthenticated(false);
    }



    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuth, removeAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth muse be used within AuthProvider')
    }
    return context;
}