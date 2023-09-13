export interface User {
    id: number;
    name: string;
    password: string;
    address: string;
    phone: number;
    email: string;
    profession: string;
}

export interface UserAdd {
    email: string;
    password: string;
}