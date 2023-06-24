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
     Post.belongsTo(models.user, { foreignKey: 'id_user' });
     Post.belongsTo(models.Category, { foreignKey: 'id_cat' }); 

     Post.hasMany(models.Img, { foreignKey: 'id_post' });
     Post.hasMany(models.Video, { foreignKey: 'id_post' });

     Post.hasMany(models.Post_Like, { foreignKey: 'id_post' });
     Post.hasMany(models.Post_Comment, { foreignKey: 'id_post' });
     Post.hasMany(models.Post_Comment, { foreignKey: 'rep_id' });
     Post.hasMany(models.Save_Post, { foreignKey: 'id_post' });

     Post.hasMany(models.Notification, { foreignKey: 'id_post' });
    }
  }
  Post.init({
    id_cat: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    type: DataTypes.ENUM("Tìm kiếm","Trao đổi","Trao tặng"),
    post_content: DataTypes.STRING,
    title: DataTypes.STRING,
    citycode: DataTypes.INTEGER,
    districtcode: DataTypes.INTEGER,
    communecode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};