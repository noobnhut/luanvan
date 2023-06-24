'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Rating.belongsTo(models.user, { foreignKey: 'to_user' });
      User_Rating.belongsTo(models.user, { foreignKey: 'from_user' });
    }
  }
  User_Rating.init({
    rating_score: DataTypes.DECIMAL,
    to_user: DataTypes.INTEGER,
    from_user: DataTypes.INTEGER,
    rating_content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_Rating',
  });
  return User_Rating;
};