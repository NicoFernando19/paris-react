import { ProfileForm } from '../types';

const api = import.meta.env.VITE_API_URL

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${api}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error)
    }
}

export const getProfile = async() => {
    try {
        const access_token = localStorage.getItem('accessToken');
        const response = await fetch(`${api}/auth/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            }
        });
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error)
    }
}

export const updateProfile = async (userId?: number, data?: ProfileForm) =>{
    try {
        const access_token = localStorage.getItem('accessToken');
        const response = await fetch(`${api}/users/${userId}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            }
        });
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error)
    }
}
