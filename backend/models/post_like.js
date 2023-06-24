'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post_Like.belongsTo(models.Post, { foreignKey: 'id_post' });
      Post_Like.belongsTo(models.user, { foreignKey: 'id_user' });
    }
  }
  Post_Like.init({
    id_user: DataTypes.INTEGER,
    id_post: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Post_Like',
  });
  return Post_Like;
};