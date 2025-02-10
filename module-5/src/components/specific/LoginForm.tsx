import { Login } from '@/types'
import React from 'react'
import Card from '../common/Card'
import Link from 'next/link'
import InputField from '../common/InputField'
import Button from '../common/Button'

interface LoginFormProps {
    handleSubmit: () => void
    handleForm: (event: React.ChangeEvent<HTMLInputElement>) => void
    form: Login
}

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit, handleForm, form }) => {
    return (
        <section className='flex place-items-center h-dvh justify-center'>
            <Card className='w-1/4'>
                <Card.Header className='text-center text-2xl font-bold my-4'>
                    <Link className='text-black' href={'/'}>
                        ShopMart
                    </Link>
                </Card.Header>
                <InputField 
                    id='email'
                    name='email'
                    onChange={handleForm}
                    type='text'
                    value={form.email}
                    label='Email'
                    placeholder='john@doe.com'
                    className='p-1.5 bg-slate-100 text-black'
                />
                <InputField 
                    id='password'
                    name='password'
                    onChange={handleForm}
                    type='password'
                    value={form.password}
                    label='Password'
                    placeholder='password'
                    className='p-1.5 bg-slate-100 text-black'
                />
                <Button
                    className='mt-4 text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300' 
                    label='Submit' 
                    onClick={handleSubmit} />
            </Card>
        </section>
    )
}

export default LoginForm;