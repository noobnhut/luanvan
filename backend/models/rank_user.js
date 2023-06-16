'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rank_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     rank_user.belongsTo(models.Category, { foreignKey: 'id_cat' });
     rank_user.belongsTo(models.User, { foreignKey: 'id_user' });
    }
  }
  rank_user.init({
    id_cat: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    count_rank: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rank_user',
  });
  return rank_user;
};