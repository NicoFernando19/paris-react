import React from 'react';

interface CardProps {
    children: React.ReactNode
    className?: string
}

const Card: React.FC<CardProps> & { Header: React.FC<CardHeaderProps> } = ({ children, className }) => {
    return (
        // aku sering sebut string interpolation atau developer lain lebih kenal template literal
        <div className={`${className} p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700`}>
            {children}
        </div>
    )
}

// Compound Component
interface CardHeaderProps {
    children: React.ReactNode
    className?: string
}

const Header: React.FC<CardHeaderProps> = ({ children, className }) => {
    return (
        <div className={`${className}`}>
            {children}
        </div>
    )
}

Card.Header = Header;

export default Card;