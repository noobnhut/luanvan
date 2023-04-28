'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     Video.belongsTo(models.Post, { foreignKey: 'id_post' });

    }
  }
  Video.init({
    id_post: DataTypes.INTEGER,
    url: DataTypes.STRING,
    video: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};