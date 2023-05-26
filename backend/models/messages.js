'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Messages.belongsTo(models.User, { foreignKey: 'sender_id' });
      Messages.belongsTo(models.User, { foreignKey: 'receiver_id' });
      Messages.belongsTo(models.Conversations, { foreignKey: 'conversation_id' });
    }
  }
  Messages.init({
    sender_id: DataTypes.INTEGER,
    conversation_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    messenger_content:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};