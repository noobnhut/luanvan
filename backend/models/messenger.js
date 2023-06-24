'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      messenger.belongsTo(models.user, { foreignKey: 'receiver_id' });
      messenger.belongsTo(models.user, { foreignKey: 'sender_id' });
    }
  }
  messenger.init({
    sender_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    nmessager: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'messenger',
  });
  return messenger;
};