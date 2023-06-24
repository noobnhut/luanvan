'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Report_User.belongsTo(models.user, { foreignKey: 'user_report' });
      Report_User.belongsTo(models.user, { foreignKey: 'user_reported' });
    }
  }
  Report_User.init({
    user_reported: DataTypes.INTEGER,
    user_report: DataTypes.INTEGER,
    report_content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Report_User',
  });
  return Report_User;
};