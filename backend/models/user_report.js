'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Report.belongsTo(models.User,{foreignKey:'user_report'})
      User_Report.belongsTo(models.User,{foreignKey:'user_reported'})
    }
  }
  User_Report.init({
    user_report: DataTypes.INTEGER,
    user_reported: DataTypes.INTEGER,
    report_content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_Report',
  });
  return User_Report;
};