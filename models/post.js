'use strict';
const {
  Model
} = require('sequelize');
const { post } = require('../routes/post.router');
//const { foreginkey } = require('sequelize/types/query-types');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    img: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
});
Post.associate = function (models) {
  Post.belongsTo(models.User, {
    foreginkey:'id',
    onDelete: 'cascade'
  });
  Post.belongsToMany(models.User,{
    foreginkey:'id',
    through:'Like'
  });
};
  return Post;
};