// 'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlogPosts extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'posts',
      });
    }
  }
  BlogPosts.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      createdAt: 'published',
      updatedAt: 'updated',
    },
    {
      sequelize,
      modelName: 'BlogPosts',
    },
  );
  return BlogPosts;
};
