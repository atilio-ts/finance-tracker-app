import { Sequelize, Model, DataTypes } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: './database.sqlite3'
});

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    profession: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
);

class Account extends Model {}
Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    balance: {
        type: new DataTypes.INTEGER,
        allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Account'
  }
);

class Transaction extends Model {}
Transaction.init(
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
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Transaction'
  }
);

User.hasMany(Account, {as :'User',foreignKey:'UserId'})
Account.belongsTo(User, {as: 'User'})
Account.hasMany(Transaction, {as : 'Account', foreignKey:'AccountId'})
Transaction.belongsTo(Account, {as: 'Account'})

export { User, Account, Transaction }