'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History_Messenge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     History_Messenge.belongsTo(models.User, { foreignKey: 'id_user' });
     History_Messenge.belongsTo(models.Conversations, { foreignKey: 'id_conversation' });
    }
  }
  History_Messenge.init({
    id_conversation: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'History_Messenge',
  });
  return History_Messenge;
};