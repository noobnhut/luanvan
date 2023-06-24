'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Save_Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Save_Post.belongsTo(models.Post, { foreignKey: 'id_post' });
      Save_Post.belongsTo(models.user, { foreignKey: 'id_user' });
    }
  }
  Save_Post.init({
    id_user: DataTypes.INTEGER,
    id_post: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Save_Post',
  });
  return Save_Post;
};