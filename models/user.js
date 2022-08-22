'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    location: DataTypes.STRING,
    profile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = function (models) {
    User.hasMany(models.Post,{
        foreignKey: 'id',
        onDelete: 'cascade'
    });
  };
  return User;
};