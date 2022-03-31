'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    // title: DataTypes.STRING,
    // author: DataTypes.STRING,
    // releaseDate: DataTypes.DATEONLY,
    // pageCount: DataTypes.INTEGER,
    // publisher: DataTypes.STRING
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false

    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false

    },
    pageCount: {
      type: DataTypes.INTEGER,
      allowNull: false

    },
    publisher: {
      type: DataTypes.STRING(100),
      allowNull: false

    },
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
