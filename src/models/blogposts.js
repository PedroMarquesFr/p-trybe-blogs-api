// 'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlogPosts extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  BlogPosts.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      published: { type: DataTypes.DATE, defaultValue: Date.now() },
      updated: { type: DataTypes.DATE, defaultValue: Date.now() },
    },
    {
      sequelize,
      modelName: 'BlogPosts',
      timestamps: false,
    },
  );
  return BlogPosts;
};
