'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     Notification.belongsTo(models.Post, { foreignKey: 'id_post' });
     Notification.belongsTo(models.user, { foreignKey: 'id_user' });
    }
  }
  Notification.init({
    id_user: DataTypes.INTEGER,
    id_post: DataTypes.INTEGER,
    notification_content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};