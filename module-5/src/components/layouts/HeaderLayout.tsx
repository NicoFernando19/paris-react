import React from 'react'
import Header from '../specific/Header'

interface HeaderLayoutProps {
    children: React.ReactNode
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children }) => {
    return (
        <>
            <Header headerTitle='ShopMart' />
            <main>{children}</main>
        </>
    )
}

export default HeaderLayout