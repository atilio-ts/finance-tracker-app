import 'mocha'
import { expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../../../src/services/users';
import { UserModel } from '../../../database/models';
import { genders } from '../../../src/types/users';

describe('UserService', () => {
  let findOneStub: SinonStub;
  let createStub: SinonStub;
  let updateStub: SinonStub;
  let signStub: SinonStub;
  let verifyStub: SinonStub;
  let compareStub: SinonStub;
  let hashStub: SinonStub;

  beforeEach(() => {
    findOneStub = stub(UserModel, 'findOne');
    createStub = stub(UserModel, 'create');
    updateStub = stub(UserModel, 'update');
    signStub = stub(jwt, 'sign');
    verifyStub = stub(jwt, 'verify');
    compareStub = stub(bcrypt, 'compare');
    hashStub = stub(bcrypt, 'hash');
  });

  afterEach(() => {
    findOneStub.restore();
    createStub.restore();
    updateStub.restore();
    signStub.restore();
    verifyStub.restore();
    compareStub.restore();
    hashStub.restore();
  });

  const mockUser = {
    id: 1,
    name: 'TEST',
    password: '$2b$12$5xtf2iO8L4a8sxd71Z80ougO/fqd8NFTXk5cg4by.9tQcWKTWATda',
    address: 'test address',
    phone: 12345,
    gender: genders.RATHER_NOT_SAY,
    dateOfBirth: new Date(),
    email:'test@test.com',
    profession: 'Tester'
  };

  describe('UserService - register', () => {
    let getUserbyEmailStub: SinonStub;
    beforeEach(() => getUserbyEmailStub = stub(UserService, 'getUserbyEmail'))
    afterEach(() => getUserbyEmailStub.restore());

    it.skip('should create an user when given a valid data', async () => {      
      getUserbyEmailStub.resolves(null);
      hashStub.resolves(mockUser.password);
      createStub.resolves(true);
      UserService.register(mockUser)
        .then((res) => {
          expect(res).to.be.deep.equal(true);
        });
    });

    it.skip('should return an error when the email is already registered', async () => {      
      getUserbyEmailStub.resolves(mockUser);
      hashStub.resolves(mockUser.password);
      createStub.resolves(true);
      UserService.register(mockUser)
        .catch((res) => {
          expect(res).to.be.an('error');
        });
    });

    it.skip('should throw an error when there is a database error', async () => {
      getUserbyEmailStub.resolves(null);
      hashStub.resolves(mockUser.password);
      createStub.throwsException();
      UserService.register(mockUser)
        .catch((err) => {
          expect(err).to.be.an('error');
        });
    });
  });

  describe('UserService - login', () => {
    let getUserbyEmailStub: SinonStub;
    beforeEach(() => {
      getUserbyEmailStub = stub(UserService, 'getUserbyEmail');
    });
  
    afterEach(() => {
      getUserbyEmailStub.restore();
    });
    it.skip('should return a token when given a valid data', async () => {      
      getUserbyEmailStub.resolves(mockUser);
      compareStub.resolves(mockUser.password);
      signStub.resolves("token");
      UserService.login(mockUser)
        .then((res) => {
          expect(res).to.be.a('string');
        });
    });

    it.skip('should return an error when the user doesnt exist', async () => {      
      getUserbyEmailStub.resolves(null);
      compareStub.resolves(mockUser.password);
      signStub.resolves(true);
      UserService.login(mockUser)
        .catch((res) => {
          expect(res).to.be.an('error');
        });
    });

    it.skip('should throw an error when there is a database error', async () => {
      getUserbyEmailStub.resolves(null);
      compareStub.resolves(mockUser.password);
      signStub.throwsException();
      UserService.login(mockUser)
        .catch((err) => {
          expect(err).to.be.an('error');
        });
    });
  });

  describe('UserService - updateUserData', () => {
    let getUserbyIdStub: SinonStub;
    beforeEach(() => {
      getUserbyIdStub = stub(UserService, 'getUserbyId');
    });
  
    afterEach(() => {
      getUserbyIdStub.restore();
    });
    it.skip('should  update user data when given a valid data', async () => {      
      getUserbyIdStub.resolves(mockUser);
      hashStub.resolves(mockUser.password);
      updateStub.resolves(true);
      UserService.updateUserData(mockUser)
        .then((res) => {
          expect(res).to.be.true;
        });
    });

    it.skip('should return an error when the user doesnt exist', async () => {      
      getUserbyIdStub.resolves(null);
      hashStub.resolves(mockUser.password);
      updateStub.resolves(true);
      UserService.updateUserData(mockUser)
        .catch((res) => {
          expect(res).to.be.an('error');
        });
    });

    it.skip('should throw an error when there is a database error', async () => {
      getUserbyIdStub.resolves(null);
      hashStub.resolves(mockUser.password);
      updateStub.throwsException();
      UserService.updateUserData(mockUser)
        .catch((err) => {
          expect(err).to.be.an('error');
        });
    });
  });

  describe('UserService - verifyToken', () => {
    let getUserbyIdStub: SinonStub;
    beforeEach(() => {
      getUserbyIdStub = stub(UserService, 'getUserbyId');
    });
  
    afterEach(() => {
      getUserbyIdStub.restore();
    });
    it.skip('should get user data when given a valid data', async () => { 
      verifyStub.resolves({ id: "1" });     
      getUserbyIdStub.resolves(mockUser);
      UserService.verifyToken("token")
        .then((res) => {
          expect(res).to.deep.equal(mockUser);
        });
    });

    it.skip('should throw an error when there is an error', async () => {
      verifyStub.resolves({ id: "1" });     
      getUserbyIdStub.throwsException();
      UserService.verifyToken("token")
        .catch((err) => {
          expect(err).to.be.an('error');
        });
    });
  });

  describe('UserService - getUserbyEmail', () => {
    it.skip('should  update user data when given a valid data', async () => {      
      findOneStub.resolves({ dataValues: mockUser});
      UserService.getUserbyEmail(mockUser.email)
        .then((res) => {
          expect(res).to.be.deep.equal(mockUser);
        });
    });

    it.skip('should return an error when the user doesnt exist', async () => {      
      findOneStub.throwsException();
      UserService.getUserbyEmail(mockUser.email)
        .catch((res) => {
          expect(res).to.be.an('error');
        });
    });
  });

  describe('UserService - getUserbyId', () => {
    it.skip('should  update user data when given a valid data', async () => {      
      findOneStub.resolves({ dataValues: mockUser});
      UserService.getUserbyId(mockUser.id)
        .then((res) => {
          expect(res).to.be.deep.equal(mockUser);
        });
    });

    it.skip('should return an error when the user doesnt exist', async () => {      
      findOneStub.throwsException();
      UserService.getUserbyId(mockUser.id)
        .catch((res) => {
          expect(res).to.be.an('error');
        });
    });
  });
});