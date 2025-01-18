export interface Category {
    id: number;
    name: string;
    image: string
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
}

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