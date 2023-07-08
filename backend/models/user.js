'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.User_Rating, { foreignKey: 'to_user' });
      user.hasMany(models.User_Rating, { foreignKey: 'from_user' });

      user.hasMany(models.Post, { foreignKey: 'id_user' });

      user.hasMany(models.Report_User, { foreignKey: 'user_report' });
      user.hasMany(models.Report_User, { foreignKey: 'user_reported' });

      user.hasMany(models.Post,{foreignKey:'id_user'});
      user.hasMany(models.Post_Comment,{foreignKey:'id_user'});
      user.hasMany(models.Post_Like,{foreignKey:'id_user'});
      user.hasMany(models.Save_Post,{foreignKey:'id_user'});

      user.hasMany(models.Notification,{foreignKey:'id_user'});

      user.hasMany(models.messenger, { foreignKey: 'receiver_id' });
      user.hasMany(models.messenger, { foreignKey: 'sender_id' });

      user.hasMany(models.Follow, { foreignKey: 'userfollow' });
      user.hasMany(models.Follow, { foreignKey: 'userfollowed' });

      user.hasMany(models.NotificationSetting, { foreignKey: 'id_user' });

    }
  }
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.STRING,
    citycode: DataTypes.INTEGER,
    districtcode: DataTypes.INTEGER,
    communecode: DataTypes.INTEGER,
    ranking_score: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
    notification_status: DataTypes.BOOLEAN,
    priority: DataTypes.ENUM("1","2","3","4")
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};