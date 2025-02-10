import LoginForm from '@/components/specific/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { login } from '@/services/Auth';
import { Login as LoginType } from '@/types';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Login = () => {
    const [form, setForm] = useState<LoginType>({
        email: '',
        password: ''
    });
    const router = useRouter();
    const { setAuth } = useAuth()
    
    const handleSubmit = async () => {
        const { access_token, refresh_token } = await login(form.email, form.password);
        if(access_token) {
            setCookie('accessToken', access_token, { maxAge: 60 * 60 * 24 })
            setCookie('refreshToken', refresh_token, { maxAge: 60 * 60 * 48 })
            setAuth();
            router.push('/')
        }
    }

    const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name
        const value = event.target.value
        setForm((prevData) => {
            return {
                ...prevData,
                [key]: value
            }
        })
    }

    return (
        <>
            <LoginForm 
                handleForm={handleForm}
                handleSubmit={handleSubmit}
                form={form}
            />
        </>
    )
}

Login.layout = 'Auth';

export default Login;