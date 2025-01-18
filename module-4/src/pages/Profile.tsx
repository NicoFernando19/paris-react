import { useEffect, useState } from 'react';
import Card from '../components/Card';
import { ProfileForm, Profile as ProfileType } from '../types';
import { getProfile, updateProfile } from '../services/Auth';
import Button from '../components/Button';
import InputField from '../components/InputField';
import withAuth, { WithAuthProps } from '../hoc/WithAuth';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
const Profile: React.FC<WithAuthProps> = ({ isAuthenticated }) => {
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [profile, setProfile] = useState<Partial<ProfileType>>({});
    const [profileForm, setProfileForm] = useState<ProfileForm>({
        email: '',
        name: '',
        role: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated){
                const data = await getProfile()
                if (data) {
                    setProfile(data)
                }
            } else {
                navigate('/')
            }
        }
        fetchData()
    }, [])

    const handleUpdate = () => {
        setIsUpdate(() => !isUpdate)
        setProfileForm(() => {
            return {
                email: profile.email,
                name: profile.name,
                role: profile.role
            }
        })
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

    const handleSave = async () => {
        const data = await updateProfile(profile.id, profileForm)
        setProfile(data)
    }

    return (
       <section>
            <div className='w-full'>
                <div className='container mx-auto my-4 p-4'>
                    <div className='flex flex-wrap justify-center'>
                        <Card>
                            <Card.Header>
                                <img src={profile.avatar} alt={profile.name} />
                            </Card.Header>
                            {isUpdate ? (
                                <>
                                    <InputField
                                        className='py-1'
                                        id='name'
                                        name='name'
                                        type='text'
                                        value={profileForm.name}
                                        onChange={handleField}
                                    />
                                    <InputField
                                        className='py-1'
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
                                    <p className='py-1.5'>Name: {profile.name}</p>
                                    <p className='py-1.5'>Email: {profile.email}</p>
                                    <p className='py-1.5'>Role: {profile.role}</p>
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

// eslint-disable-next-line react-refresh/only-export-components
export default withAuth(Profile);