import React from 'react';

interface WithoutHeaderProps {
    children: React.ReactNode
}

const WithoutHeader: React.FC<WithoutHeaderProps> = ({ children }) => {
    return (
        <>
            <main>{children}</main>
        </>
    )
}

export default WithoutHeader;