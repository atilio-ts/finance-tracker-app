import 'mocha';
import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { TransactionService } from '../../../src/services/transactions'; 
import { TransactionModel } from '../../../database/models';
import { AccountService } from '../../../src/services/accounts';
import { transactionCategories, transactionTypes } from '../../../src/types/transactions';
import { currencies, accountType } from '../../../src/types/accounts';

describe('TransactionService', () => {
    let findAllStub: SinonStub;
    let findOneStub: SinonStub;
    let createStub: SinonStub;
    let updateStub: SinonStub;
    let destroyStub: SinonStub;
    let sumStub: SinonStub;
    let getAccountByIdStub: SinonStub;
    
    beforeEach(() => {
        findAllStub = sinon.stub(TransactionModel, 'findAll');
        findOneStub = sinon.stub(TransactionModel, 'findOne');
        createStub = sinon.stub(TransactionModel, 'create');
        updateStub = sinon.stub(TransactionModel, 'update');
        destroyStub = sinon.stub(TransactionModel, 'destroy');
        sumStub = sinon.stub(TransactionModel, 'sum');
        getAccountByIdStub = sinon.stub(AccountService, 'getAccountById');
    });

    afterEach(() => {
        findAllStub.restore();
        findOneStub.restore();
        createStub.restore();
        updateStub.restore();
        destroyStub.restore();
        sumStub.restore();
        getAccountByIdStub.restore();
    });

    const mockId = 1;

    const mockTransaction = {
        id: 1,
        type: transactionTypes.INCOME,
        category: transactionCategories.SALARY,
        date: new Date(),
        description: "Work",
        amount: 0.90,
        AccountId: 1
    };

    const mockAccount = { 
        id: 1,
        name: 'MR. TEST ACCOUNT',
        currentBalance: 5000.00,
        initialBalance: 10000.10,
        currency: currencies.USD,
        accountType: accountType.BANK,
        UserId: 1
    }

    describe('TransactionService - getTransactionsByAccountId', () => {
        it('should return transactions when given a  valid TransactionId and AccountId', async () => {
            getAccountByIdStub.resolves(mockAccount);
            findAllStub.resolves(mockTransaction);

            TransactionService.getTransactionsByAccountId({ UserId: mockId,AccountId: mockId })
                .then((res) => {
                    expect(res).to.deep.equal(mockTransaction);
                });
        });

        it('should throw an error when the account does not exist', async () => {
            getAccountByIdStub.resolves(null);
            findAllStub.resolves(mockTransaction);
    
            TransactionService.getTransactionsByAccountId({ UserId: mockId,AccountId: mockId })
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });

        it('should throw an error when there is a database error', async () => {
            getAccountByIdStub.resolves(mockAccount);
            findAllStub.throwsException();
    
            TransactionService.getTransactionsByAccountId({ UserId: mockId,AccountId: mockId })
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });
    });

    describe('TransactionService - getTransactionById', () => {
        it('should return transactions when given a valid TransactionId and AccountId', async () => {
        getAccountByIdStub.resolves(mockAccount);
        findOneStub.resolves(mockTransaction);

        TransactionService.getTransactionById({ UserId: mockId, AccountId: mockId, id:mockId })
        .then((res) => {
            expect(res).to.deep.equal(mockTransaction);
        });
        });

        it('should throw an error when the account does not exist', async () => {
            getAccountByIdStub.resolves(null);
            findOneStub.resolves(mockTransaction);
    
            TransactionService.getTransactionById({ UserId: mockId, AccountId: mockId, id:mockId })
            .catch((err) => {
                expect(err).to.be.an('error');
            });
        });

        it('should throw an error when there is a database error', async () => {
            getAccountByIdStub.resolves(mockAccount);
            findOneStub.throwsException();
    
            TransactionService.getTransactionById({ UserId: mockId, AccountId: mockId, id:mockId })
            .catch((err) => {
                expect(err).to.be.an('error');
            });
        });
    });

    describe('TransactionService - createTransaction', () => {
        let updateAccountCurrentBalanceStub: SinonStub;
        beforeEach(() => updateAccountCurrentBalanceStub = sinon.stub(TransactionService, 'updateAccountCurrentBalance'))
        afterEach(() => updateAccountCurrentBalanceStub.restore());

        it('should create a transaction when given a valid AccountId', async () => {
            getAccountByIdStub.resolves(mockAccount);
            createStub.resolves(true);
            updateAccountCurrentBalanceStub.resolves(true);
            
            TransactionService.createTransaction(mockId, mockTransaction)
                .then((res) => {
                    expect(res).to.deep.equal(mockTransaction);
                });
        });

        it('should throw an error when the account does not exist', async () => {
            getAccountByIdStub.resolves(null);
            createStub.resolves(true);
            updateAccountCurrentBalanceStub.resolves(true);
    
            TransactionService.createTransaction(mockId, mockTransaction)
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });

        it('should throw an error when there is a database error', async () => {
            getAccountByIdStub.resolves(mockAccount);
            createStub.throwsException();
            updateAccountCurrentBalanceStub.resolves(true);
    
            TransactionService.createTransaction(mockId, mockTransaction)
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });
    });

    describe('TransactionService - updateTransaction', () => {
        let updateAccountCurrentBalanceStub: SinonStub;
        let getTransactionByIdStub: SinonStub;

        beforeEach(() => {
            getTransactionByIdStub = sinon.stub(TransactionService, 'getTransactionById');
            updateAccountCurrentBalanceStub = sinon.stub(TransactionService, 'updateAccountCurrentBalance');
        });
        afterEach(() => {
            getTransactionByIdStub.restore();
            updateAccountCurrentBalanceStub.restore();
        });

        it('should update a transaction when given a valid Transaction and AccountId', async () => {
            getAccountByIdStub.resolves(mockAccount);
            getTransactionByIdStub.resolves(mockTransaction);
            updateStub.resolves(true);
            updateAccountCurrentBalanceStub.resolves(true);
            
            TransactionService.updateTransaction(mockId, mockTransaction)
                .then((res) => {
                    expect(res).to.deep.equal(mockTransaction);
                });
        });

        it('should throw an error when the account does not exist', async () => {
            getAccountByIdStub.resolves(null);
            getTransactionByIdStub.resolves(mockTransaction);
            updateStub.resolves(true);
            updateAccountCurrentBalanceStub.resolves(true);
    
            TransactionService.updateTransaction(mockId, mockTransaction)
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });

        it('should throw an error when the transaction does not exist', async () => {
            getAccountByIdStub.resolves(mockAccount);
            getTransactionByIdStub.resolves(null);
            updateStub.resolves(true);
            updateAccountCurrentBalanceStub.resolves(true);
    
            TransactionService.updateTransaction(mockId, mockTransaction)
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });

        it('should throw an error when there is a database error', async () => {
            getAccountByIdStub.resolves(mockAccount);
            getTransactionByIdStub.resolves(mockTransaction);
            updateStub.throwsException(true);
            updateAccountCurrentBalanceStub.resolves(true);
    
            TransactionService.updateTransaction(mockId, mockTransaction)
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });
    });

    describe('TransactionService - deleteTransaction', () => {
        let updateAccountCurrentBalanceStub: SinonStub;
        let getTransactionByIdStub: SinonStub;

        beforeEach(() => {
            getTransactionByIdStub = sinon.stub(TransactionService, 'getTransactionById');
            updateAccountCurrentBalanceStub = sinon.stub(TransactionService, 'updateAccountCurrentBalance');
        });
        afterEach(() => {
            getTransactionByIdStub.restore();
            updateAccountCurrentBalanceStub.restore();
        });

        it('should delete a transaction when given a valid Transaction and AccountId', async () => {
            getAccountByIdStub.resolves(mockAccount);
            getTransactionByIdStub.resolves(mockTransaction);
            destroyStub.resolves(true);
            updateAccountCurrentBalanceStub.resolves(true);
            
            TransactionService.deleteTransaction({ id: mockId, AccountId: mockId, UserId: mockId})
                .then((res) => {
                    expect(res).to.deep.equal(mockTransaction);
                });
        });

        it('should throw an error when the account does not exist', async () => {
            getAccountByIdStub.resolves(null);
            getTransactionByIdStub.resolves(mockTransaction);
            destroyStub.resolves(true);
            updateAccountCurrentBalanceStub.resolves(true);
    
            TransactionService.deleteTransaction({ id: mockId, AccountId: mockId, UserId: mockId})
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });

        it('should throw an error when the transaction does not exist', async () => {
            getAccountByIdStub.resolves(mockAccount);
            getTransactionByIdStub.resolves(null);
            destroyStub.resolves(true);
            updateAccountCurrentBalanceStub.resolves(true);
    
            TransactionService.deleteTransaction({ id: mockId, AccountId: mockId, UserId: mockId})
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });

        it('should throw an error when there is a database error', async () => {
            getAccountByIdStub.resolves(mockAccount);
            getTransactionByIdStub.resolves(mockTransaction);
            destroyStub.throwsException(true);
            updateAccountCurrentBalanceStub.resolves(true);
    
            TransactionService.deleteTransaction({ id: mockId, AccountId: mockId, UserId: mockId})
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });
    });

    describe('TransactionService - getAllExpensesFromAccount', () => {
        it('should return the sum of all expenses when given a valid User and AccountId', async () => {
            getAccountByIdStub.resolves(mockAccount);
            sumStub.resolves(30);
            
            TransactionService.getAllExpensesFromAccount({ AccountId: mockId, UserId: mockId})
                .then((res) => {
                    expect(res).to.deep.equal(30);
                });
        });

        it('should throw an error when the account does not exist', async () => {
            getAccountByIdStub.resolves(null);
            sumStub.resolves(30);
    
            TransactionService.getAllExpensesFromAccount({ AccountId: mockId, UserId: mockId})
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });

        it('should throw an error when there is a database error', async () => {
            getAccountByIdStub.resolves(mockAccount);
            sumStub.throwsException();
    
            TransactionService.getAllExpensesFromAccount({ AccountId: mockId, UserId: mockId})
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });
    });

    describe('TransactionService - getAllIncomesFromAccount', () => {
        it('should return the sum of all incomes when given a valid User and AccountId', async () => {
            getAccountByIdStub.resolves(mockAccount);
            sumStub.resolves(30);
            
            TransactionService.getAllIncomesFromAccount({ AccountId: mockId, UserId: mockId})
                .then((res) => {
                    expect(res).to.deep.equal(30);
                });
        });

        it('should throw an error when the account does not exist', async () => {
            getAccountByIdStub.resolves(null);
            sumStub.resolves(30);
    
            TransactionService.getAllIncomesFromAccount({ AccountId: mockId, UserId: mockId})
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });

        it('should throw an error when there is a database error', async () => {
            getAccountByIdStub.resolves(mockAccount);
            sumStub.throwsException();
    
            TransactionService.getAllIncomesFromAccount({ AccountId: mockId, UserId: mockId})
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });
    });

    describe('TransactionService - updateAccountCurrentBalance', () => {
        let getAllExpensesFromAccountStub: SinonStub;
        let getAllIncomesFromAccountStub: SinonStub;
        let updateAccountStub: SinonStub;

        beforeEach(() => {
            getAllExpensesFromAccountStub = sinon.stub(TransactionService, 'getAllExpensesFromAccount');
            getAllIncomesFromAccountStub = sinon.stub(TransactionService, 'getAllIncomesFromAccount');
            updateAccountStub = sinon.stub(AccountService, 'updateAccount');
        });
        afterEach(() => {
            getAllExpensesFromAccountStub.restore();
            getAllIncomesFromAccountStub.restore();
            updateAccountStub.restore();
        });

        it('should update the current when given a valid User, AccountId and initialBalance', async () => {
            getAllExpensesFromAccountStub.resolves(30);
            getAllIncomesFromAccountStub.resolves(30);
            updateAccountStub.resolves(true);
            
            TransactionService.updateAccountCurrentBalance(mockId, mockId, 30)
                .then((res) => {
                    expect(res).to.deep.equal(30);
                });
        });

        it('should throw an error when there is a database error', async () => {
            getAllExpensesFromAccountStub.resolves(30);
            getAllIncomesFromAccountStub.resolves(30);
            updateAccountStub.throwsException();
    
            TransactionService.updateAccountCurrentBalance(mockId, mockId, 30)
                .catch((err) => {
                    expect(err).to.be.an('error');
                });
        });
    });
});