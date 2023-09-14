import { Sequelize, Model, DataTypes } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: './database.sqlite3'
});

class UserModel extends Model {}
UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    gender: {
      type: new DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    profession: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
);

class AccountModel extends Model {}
AccountModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    currentBalance: {
      type: new DataTypes.DOUBLE,
      allowNull: false
    },
    initialBalance: {
      type: new DataTypes.DOUBLE,
      allowNull: false
    },
    currency: {
      type: new DataTypes.STRING,
      allowNull: false
    },
    accountType: {
      type: new DataTypes.STRING(3),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Account'
  }
);

class TransactionModel extends Model {}
TransactionModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    category: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Transaction'
  }
);

UserModel.hasMany(AccountModel, {as :'User',foreignKey:'UserId'})
AccountModel.belongsTo(UserModel, {as: 'User'})
AccountModel.hasMany(TransactionModel, {as : 'Account', foreignKey:'AccountId'})
TransactionModel.belongsTo(AccountModel, {as: 'Account'})

export { UserModel, AccountModel, TransactionModel }