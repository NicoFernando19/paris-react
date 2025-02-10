import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface HeaderProps {
    headerTitle: string;
}

const Header: React.FC<HeaderProps> = ({ headerTitle }) => {
    const { isAuthenticated, removeAuth } = useAuth();
    const router = useRouter();
    // router.pathname -> saat kita buka di browser http://localhost:3000/  hasil outputnya /
    // router.pathname -> saat kita buka di browser http://localhost:3000/products  hasil outputnya /products
    const handleLogOut = () => {
        removeAuth()
        router.push('/')
    }

    return (
        <section>
            <nav className='bg-gray-900 border-gray-200'>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                    <Link href="/" className='flex items-center space-x-3 rtl:space-x-reverse'>
                        <span className='text-white text-2xl font-semibold whitespace-nowrap self-center'>
                            {headerTitle}
                        </span>
                    </Link>
                    <div className='w-auto'>
                        <ul className='font-medium text-white flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0'>
                            <li className='cursor-pointer'>
                                <Link 
                                    href="/"
                                    className={router.pathname === '/' ? "text-blue-500" : "hover:text-blue-400"}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className='cursor-pointer'>
                                <Link 
                                    href="/products"
                                    className={router.pathname === '/products' ? "text-blue-500" : "hover:text-blue-400"}
                                >
                                    Products
                                </Link>
                            </li>
                            {isAuthenticated ? (
                               <>
                                    <li className='cursor-pointer'>
                                        <Link 
                                            href="/profile"
                                            className={router.pathname === '/profile' ? "text-blue-500" : "hover:text-blue-400"}
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li className='cursor-pointer' onClick={handleLogOut}>
                                        Log out
                                    </li>
                               </> 
                            ) : (
                                <li className='cursor-pointer'>
                                    <Link 
                                        href="/login"
                                        className={router.pathname === '/login' ? "text-blue-500" : "hover:text-blue-400"}
                                    >
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </section>
    );
}

export default Header;