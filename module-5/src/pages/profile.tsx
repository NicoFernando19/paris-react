import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import InputField from '@/components/common/InputField';
import { getProfile } from '@/services/Auth';
import { ProfileForm, Profile as ProfileType } from '@/types';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React, { useState } from 'react';

interface ProfileProps {
    profile: ProfileType
}

const Profile: React.FC<ProfileProps> = ({ profile }) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [profileForm, setProfileForm] = useState<ProfileForm>({
        email: '',
        name: '',
        role: ''
    })
    
    const handleUpdate = () => {
        setIsUpdate((prevUpdate) => !prevUpdate)
        setProfileForm(() => {
            return {
                email: profile.email,
                name: profile.name,
                role: profile.role
            }
        })

    }



    const handleSave = () => {
        //save logic
    }


    const handleField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name
        const value = event.target.value
        setProfileForm((prevData) => {
            return {
                ...prevData,
                [key]: value
            }
        })
    }

    return (
        <section>
            <div className='w-full'>
                <div className='container mx-auto my-4 p-4'>
                    <div className='flex flex-wrap justify-center'>
                        <Card>
                            <Card.Header>
                                <Image src={profile.avatar} alt={profile.name} width={300} height={300}  />
                            </Card.Header>
                            {isUpdate ? (
                                <>
                                    <InputField
                                        className='py-1 bg-white text-black'
                                        id='name'
                                        name='name'
                                        type='text'
                                        value={profileForm.name}
                                        onChange={handleField}
                                    />
                                    <InputField
                                        className='py-1 bg-white'
                                        id='email'
                                        name='email'
                                        type='text'
                                        value={profileForm.email}
                                        onChange={handleField}
                                        disabled
                                    />
                                    <InputField
                                        className='py-1'
                                        id='role'
                                        name='role'
                                        type='text'
                                        value={profileForm.role}
                                        onChange={handleField}
                                        disabled
                                    />
                                </>
                            ) : (
                                <>
                                    <p className='py-1.5 text-black'>Name: {profile.name}</p>
                                    <p className='py-1.5 text-black'>Email: {profile.email}</p>
                                    <p className='py-1.5 text-black'>Role: {profile.role}</p>
                                </>
                            )}
                            <hr />
                            <Button 
                                className='mt-4 text-white bg-yellow-700 hover:bg-yellow-800  focus:ring-yellow-300  dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800'
                                label={isUpdate ? 'Close' : 'Edit'}
                                onClick={handleUpdate}
                            />
                            {isUpdate && (
                                <Button 
                                    className='ml-2 mt-4 text-white bg-green-700 hover:bg-green-800  focus:ring-green-300  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                                    label='Save'
                                    onClick={handleSave}
                                />
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const user = await getProfile(req.cookies.accessToken as string);

    if (!user) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            profile: user,
        }
    };
} 