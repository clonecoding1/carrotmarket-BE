'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Like.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  Like.associate = function (models) {
    Like.belongsTo(models.User, {
      foreginkey:'id',
      targetKey:"id",
      onDelete: 'cascade'
    });
    Like.belongsTo(models.Post, {
      foreginkey:'id',
      targetKey:"id",
      onDelete: 'cascade'
    });
  };
  return Like;
};