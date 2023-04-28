'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class share_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    share_post.belongsTo(models.User, { foreignKey: 'id_user' });
     share_post.belongsTo(models.Post, { foreignKey: 'id_post' });
    }
  }
  share_post.init({

    id_user: DataTypes.INTEGER,
    id_post: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'share_post',
  });
  return share_post;
};