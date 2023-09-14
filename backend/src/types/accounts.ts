export enum currencies {
    USD = 'USD',
    EUR = 'EUR'
}

export enum accountType {
    BANK = 'BANK',
    CASH = 'CASH',
    SAVINGS = 'SAVINGS'
}

export interface Account {
    id?: number;
    name: string;
    currentBalance: number;
    initialBalance: number;
    currency: currencies;
    accountType: accountType
    UserId: number;
}

export interface AccountIdData {
    id: number;
    UserId: number;
}