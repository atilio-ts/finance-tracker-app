import 'mocha'
import { expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import { AccountService } from '../../../src/services/accounts';
import { AccountModel } from '../../../database/models';
import { Account, AccountIdData, accountType, currencies } from '../../../src/types/accounts';

describe('AccountService', () => {
  let findAllStub: SinonStub;
  let findOneStub: SinonStub;
  let createStub: SinonStub;
  let updateStub: SinonStub;
  let deleteStub: SinonStub;

  beforeEach(() => {
    findAllStub = stub(AccountModel, 'findAll');
    findOneStub = stub(AccountModel, 'findOne');
    createStub = stub(AccountModel, 'create');
    updateStub = stub(AccountModel, 'update');
    deleteStub = stub(AccountModel, 'destroy');
  });
  afterEach(() => {
    findAllStub.restore();
    findOneStub.restore();
    createStub.restore();
    updateStub.restore();
    deleteStub.restore();
  });

  const mockId = 1;
  const mockAccount = { 
    id: 1,
    name: 'MR. TEST ACCOUNT',
    currentBalance: 5000.00,
    initialBalance: 10000.10,
    currency: currencies.USD,
    accountType: accountType.BANK,
    UserId: 1
  }
  const mockAccounts = [mockAccount];

  describe('AccountService - getAccounts', () => {
    it('should return a list of accounts when given a valid UserId', async () => {      
      findAllStub.resolves(mockAccounts);
      AccountService.getAccounts(mockId)
        .then((res) => {
          expect(res).to.be.deep.equal(mockAccounts);
        });
    });

    it('should throw an error when there is a database error', async () => {
      findAllStub.throwsException();
      AccountService.getAccounts(mockId)
        .catch((err) => {
          expect(err).to.be.an('error');
        });
    });
  });

  describe('AccountService - getAccountById', () => {
    it('should return an account when given a valid UserId and AccountId', async () => {      
      findOneStub.resolves(mockAccounts);
      AccountService.getAccountById({ id:mockId, UserId:mockId })
        .then((res) => {
          expect(res).to.be.deep.equal(mockAccount);
        });
    });

    it('should throw an error when there is a database error', async () => {
      findOneStub.throwsException();
      AccountService.getAccountById({ id:mockId, UserId:mockId })
        .catch((err) => {
          expect(err).to.be.an('error');
        });
    });
  });

  describe('AccountService - createAccount', () => {
    it('should create an account', async () => {      
      createStub.resolves(true);
      AccountService.createAccount({ UserId: mockId, id: mockId } as Account)
        .then((res) => {
          expect(res).to.be.true;
        });
    });

    it('should throw an error when there is a database error', async () => {
      createStub.throwsException();
      AccountService.createAccount({ UserId: mockId, id: mockId } as Account)
        .catch((err) => {
          expect(err).to.be.an('error');
        });
    });
  });

  describe('AccountService - updateAccount', () => {
    let getAccountByIdStub: SinonStub;
    beforeEach(() => getAccountByIdStub = stub(AccountService, 'getAccountById'))
    afterEach(() => getAccountByIdStub.restore());

    it('should update an account when given a valid UserId and AccountId', async () => { 
      getAccountByIdStub.resolves(mockAccount);     
      updateStub.resolves(true);
      AccountService.updateAccount({ UserId: mockId, id: mockId } as Account)
        .then((res) => {
          expect(res).to.be.true;
        });
    });

    it('should throw an error when given a invalid UserId or AccountId', async () => { 
      getAccountByIdStub.resolves(null);     
      updateStub.resolves(mockAccounts);
      AccountService.updateAccount({ UserId: mockId, id: mockId } as Account)
      .catch((err) => {
          expect(err).to.be.an('error');
        });
    });

    it('should throw an error when there is a database error', async () => {
      getAccountByIdStub.resolves(mockAccount);     
      updateStub.throwsException();
      AccountService.updateAccount({ UserId: mockId, id: mockId } as Account)
        .catch((err) => {
          expect(err).to.be.an('error');
        });
    });
  });

  describe('AccountService - deleteAccount', () => {
    let getAccountByIdStub: SinonStub;
    beforeEach(() => getAccountByIdStub = stub(AccountService, 'getAccountById'))
    afterEach(() => getAccountByIdStub.restore());
    
    it('should delete an account when given a valid UserId and AccountId', async () => { 
      getAccountByIdStub.resolves(mockAccount);     
      deleteStub.resolves(true);
      AccountService.deleteAccount({ UserId: mockId, id: mockId } as AccountIdData)
        .then((res) => {
          expect(res).to.be.true;
        });
    });

    it('should throw an error when given a invalid UserId or AccountId', async () => { 
      getAccountByIdStub.resolves(null);     
      deleteStub.resolves(mockAccounts);
      AccountService.deleteAccount({ UserId: mockId, id: mockId } as AccountIdData)
      .catch((err) => {
          expect(err).to.be.an('error');
        });
    });

    it('should throw an error when there is a database error', async () => {
      getAccountByIdStub.resolves(mockAccount);     
      deleteStub.throwsException();
      AccountService.deleteAccount({ UserId: mockId, id: mockId } as AccountIdData)
        .catch((err) => {
          expect(err).to.be.an('error');
        });
    });
  });
});