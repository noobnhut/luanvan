'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Category, { foreignKey: 'id_cat' });
      Post.belongsTo(models.User, { foreignKey: 'id_user' });

      Post.hasMany(models.Video, { foreignKey: 'id_post' });
      Post.hasMany(models.Img, { foreignKey: 'id_post' });
      Post.hasMany(models.share_post, { foreignKey: 'id_post' });
      Post.hasMany(models.like_post, { foreignKey: 'id_post' });
      Post.hasMany(models.comment_post, { foreignKey: 'id_post' });

    }
  }
  Post.init({
    id_user: DataTypes.INTEGER,
    id_cat: DataTypes.INTEGER,
    type: DataTypes.ENUM('Trao đổi', 'Tìm mua', 'Bán hàng'),
    post_content: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};