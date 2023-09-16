export interface User {
    id?: number;
    name?: string;
    password?: string;
    address?: string;
    phone?: number;
    gender?: string;
    dateOfBirth?: string;
    email?: string;
    profession?: string;
}

export interface loginUser {
    email: string;
    password: string;
}

export enum genders {
    MALE = 'Male',
    FEMALE = 'Female',
    RATHER_NOT_SAY = 'Rather not say',
    OTHER = 'Other'
}