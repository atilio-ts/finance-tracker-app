export enum transactionTypes {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE'
}

export enum transactionCategories {
    SALARY = 'SALARY',
    INVESTMENTS = 'INVESTMENTS',
    FOOD = 'FOOD',
    CAR = 'CAR',
    BILLS = 'BILLS',
    SHOPPING = 'SHOPPING',
    ENTERTAIMENT = 'ENTERTAIMENT'
}

export interface Transaction {
    id?: number;
    type: transactionTypes;
    category: transactionCategories;
    date: Date;
    description: string;
    amount: number;
    AccountId: number;
}

export interface TransactionByAccountIdData {
    UserId: number;
    AccountId: number;
}

export interface TransactionByIdData {
    id: number;
    UserId: number;
    AccountId: number;
}