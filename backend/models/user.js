'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    User.hasMany(models.share_post, { foreignKey: 'id_user' });
    User.hasMany(models.like_post, { foreignKey: 'id_user' });
    User.hasMany(models.comment_post, { foreignKey: 'id_user' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    citycode: DataTypes.STRING,
    districtcode: DataTypes.STRING,
    communecode: DataTypes.STRING,
    avatar: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};