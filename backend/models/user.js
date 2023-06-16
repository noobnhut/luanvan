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
      
    User.hasMany(models.rank_user, { foreignKey: 'id_user' });
    User.hasMany(models.follow_post, { foreignKey: 'id_user' });
    User.hasMany(models.like_post, { foreignKey: 'id_user' });
    User.hasMany(models.comment_post, { foreignKey: 'id_user' });
    User.hasMany(models.User_Follow, { foreignKey: 'userfollow' });
    User.hasMany(models.Post, { foreignKey: 'id_user' });
    User.hasMany(models.User_Follow, { foreignKey: 'userfollowed' });
    User.hasMany(models.User_Report, { foreignKey: 'user_report' });
    User.hasMany(models.User_Report, { foreignKey: 'user_reported' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    citycode: DataTypes.INTEGER,
    districtcode: DataTypes.INTEGER,
    communecode: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    notication_status: DataTypes.BOOLEAN,
    isUser: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};