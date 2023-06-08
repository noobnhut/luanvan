'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follow_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    follow_post.belongsTo(models.User, { foreignKey: 'id_user' });
     follow_post.belongsTo(models.Post, { foreignKey: 'id_post' });
    }
  }
  follow_post.init({

    id_user: DataTypes.INTEGER,
    id_post: DataTypes.INTEGER,
    status:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'follow_post',
  });
  return follow_post;
};