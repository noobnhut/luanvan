'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Img extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Img.belongsTo(models.Post, { foreignKey: 'id_post' });
    }
  }
  Img.init({
    image_name: DataTypes.STRING,
    url: DataTypes.STRING,
    id_post:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Img',
  });
  return Img;
};