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
            const token = localStorage.getItem('accessToken');
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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuth, removeAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth muse be used within AuthProvider')
    }
    return context;
}