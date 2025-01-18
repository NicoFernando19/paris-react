import React, { useState } from 'react';
import Card from '../components/Card';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../services/Auth';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    /*
        array destructering
        email sebagai getter.. untuk mengambil current value
        setEmail sebagai function untuk melakukan perubahan value
    */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        //logic untuk melakukan validasi
        setEmail(event.target.value)
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        //logic untuk melakukan validasi password
        //contoh: harus 8 karakter, ada kapital, ada special character
        setPassword(event.target.value)
    }

    const handleSubmit = async () => {
        const { access_token, refresh_token } = await login(email, password);
        if(access_token) {
            localStorage.setItem('accessToken', access_token)
            localStorage.setItem('refreshToken', refresh_token)
            setAuth();
            navigate('/')
        }
    }

    return (
        <section className='flex place-items-center h-dvh justify-center'>
            <Card>
                <Card.Header className='text-center text-2xl font-bold my-4'>
                    <NavLink to={'/'}>
                        ShopMart
                    </NavLink>
                </Card.Header>
                <InputField 
                    id='name'
                    name='name'
                    onChange={handleEmail}
                    type='text'
                    value={email}
                    label='Email'
                    placeholder='john@doe.com'
                    className='p-1.5'
                />
                <InputField 
                    id='password'
                    name='password'
                    onChange={handlePassword}
                    type='password'
                    value={password}
                    label='Password'
                    placeholder='password'
                    className='p-1.5'
                />
                <Button
                    className='mt-4 text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300' 
                    label='Submit' 
                    onClick={handleSubmit} />
            </Card>
        </section>
    )
}

export default Login;