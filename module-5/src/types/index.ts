export interface Profile {
    id: number,
    email: string,
    password: string,
    name: string,
    role: string,
    avatar: string
}

export interface ProfileForm {
    name: string | undefined
    email: string | undefined
    role: string | undefined
}

export interface Login {
    email: string
    password: string
}