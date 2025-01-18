import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
    headerTitle: string;
}

const Header: React.FC<HeaderProps> = ({ headerTitle }) => {
    const { isAuthenticated, removeAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        removeAuth()
        navigate('/')
    }

    return (
        <section>
            <nav className='bg-gray-900 border-gray-200'>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                    <a href="/" className='flex items-center space-x-3 rtl:space-x-reverse'>
                        <span className='text-white text-2xl font-semibold whitespace-nowrap self-center'>
                            {headerTitle}
                        </span>
                    </a>
                    <div className='w-auto'>
                        <ul className='font-medium text-white flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0'>
                            <li className='cursor-pointer'>
                                <NavLink 
                                    to="/"
                                    className={({ isActive }) => 
                                        isActive ? "text-blue-500" : "hover:text-blue-400"
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className='cursor-pointer'>
                                <NavLink 
                                    to="/products"
                                    className={({ isActive }) => 
                                        isActive ? "text-blue-500" : "hover:text-blue-400"
                                    }
                                >
                                    Products
                                </NavLink>
                            </li>
                            {isAuthenticated ? (
                               <>
                                    <li className='cursor-pointer'>
                                        <NavLink 
                                            to="/profile"
                                            className={({ isActive }) => 
                                                isActive ? "text-blue-500" : "hover:text-blue-400"
                                            }
                                        >
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li className='cursor-pointer' onClick={handleLogOut}>
                                        Log out
                                    </li>
                               </> 
                            ) : (
                                <li className='cursor-pointer'>
                                    <NavLink 
                                        to="/login"
                                        className={({ isActive }) => 
                                            isActive ? "text-blue-500" : "hover:text-blue-400"
                                        }
                                    >
                                        Login
                                    </NavLink>
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