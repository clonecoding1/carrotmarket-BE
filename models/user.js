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
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: DataTypes.STRING,
    profile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = function (models) {
    User.hasMany(models.Post,{
        foreginkey:'id',
        onDelete: 'cascade'
    });
    User.hasMany(models.Like,{
      foreginkey:'id',
      onDelete: 'cascade'
    });
  };
  return User;
};