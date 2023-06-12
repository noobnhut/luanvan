'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Follow.belongsTo(models.User,{foreignKey:'userfollow'})
      User_Follow.belongsTo(models.User,{foreignKey:'userfollowed'})
    }
  }
  User_Follow.init({
    userfollow: DataTypes.INTEGER,
    userfollowed: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Follow',
  });
  return User_Follow;
};