import { UserModel, AccountModel, TransactionModel } from './models';
import { genders } from '../src/types/users';
import { accountType, currencies } from '../src/types/accounts';
import { transactionCategories, transactionTypes } from '../src/types/transactions';

seed();
async function seed() {
    // create tables
    await UserModel.sync({ force: true });
    await AccountModel.sync({ force: true });
    await TransactionModel.sync({ force: true });

    //insert data
    await Promise.all([
        UserModel.create({
            id: 1,
            name: 'TEST',
            password: '$2b$12$5xtf2iO8L4a8sxd71Z80ougO/fqd8NFTXk5cg4by.9tQcWKTWATda',
            address: 'test address',
            phone: 12345,
            gender: genders.RATHER_NOT_SAY,
            dateOfBirth: new Date(),
            email:'test@test.com',
            profession: 'Tester'
        }),
        AccountModel.create({
            id: 1,
            name: 'MR. TEST ACCOUNT',
            currentBalance: 5000.00,
            initialBalance: 10000.10,
            currency: currencies.USD,
            accountType: accountType.BANK,
            UserId: 1
        }),
        TransactionModel.create({
            id: 1,
            type: transactionTypes.INCOME,
            category: transactionCategories.SALARY,
            date: new Date(),
            description: "Work",
            amount: 0.90,
            AccountId: 1
        }),
        TransactionModel.create({
            id: 2,
            type: transactionTypes.EXPENSE,
            category: transactionCategories.BILLS,
            date: new Date(),
            description: "Electricity",
            amount: 5000.00,
            AccountId: 1
        }),
    ]);
}
