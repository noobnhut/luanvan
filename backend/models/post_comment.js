'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     Post_Comment.belongsTo(models.Post, { foreignKey: 'id_post' });
     Post_Comment.belongsTo(models.Post_Comment, { foreignKey: 'rep_id' });
     Post_Comment.belongsTo(models.user, { foreignKey: 'id_user' });
    }
  }
  Post_Comment.init({
    id_user: DataTypes.INTEGER,
    id_post: DataTypes.INTEGER,
    comment_content: DataTypes.STRING,
    rep_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post_Comment',
  });
  return Post_Comment;
};