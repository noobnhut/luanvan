'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comment_post.init({
    id: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    id_post: DataTypes.INTEGER,
    comment_content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comment_post',
  });
  return comment_post;
};