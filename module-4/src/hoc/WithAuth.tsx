import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export interface WithAuthProps {
    isAuthenticated: boolean;
}

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P & WithAuthProps>) => {
    const WithAuth: React.FC<Omit<P, keyof WithAuthProps>> = (props) => {
        const { isAuthenticated } = useAuth();

        return <WrappedComponent {...(props as P)} isAuthenticated={isAuthenticated} />
    }

    return WithAuth;
}

export default withAuth;
