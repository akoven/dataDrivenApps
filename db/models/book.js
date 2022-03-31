'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    // title: DataTypes.STRING,
    // author: DataTypes.STRING,
    // releaseDate: DataTypes.DATEONLY,
    // pageCount: DataTypes.INTEGER,
    // publisher: DataTypes.STRING
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    author: {
      type: Sequelize.STRING(100),
      allowNull: false

    },
    releaseDate: {
      type: Sequelize.DATEONLY,
      allowNull: false

    },
    pageCount: {
      type: Sequelize.INTEGER,
      allowNull: false

    },
    publisher: {
      type: Sequelize.STRING(100),
      allowNull: false

    },
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};
