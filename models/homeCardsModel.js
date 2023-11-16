const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const homeCards = sequelize.define("homecards", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    iconUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  homeCards.beforeValidate((homeCards, options) => {
    if (!homeCards.id) {
      homeCards.id = v4();
    }
  });

  return homeCards;
};
