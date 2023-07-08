'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NotificationSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NotificationSetting.belongsTo(models.user, { foreignKey: 'id_user' });

    }
  }
  NotificationSetting.init({
    id_user: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    location_radius: DataTypes.DOUBLE,
    type_post: DataTypes.ENUM("Tìm kiếm","Trao đổi","Trao tặng"),
  }, {
    sequelize,
    modelName: 'NotificationSetting',
  });
  return NotificationSetting;
};