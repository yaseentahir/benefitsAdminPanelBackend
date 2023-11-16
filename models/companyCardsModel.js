const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const comapnyCard = sequelize.define("companycards", {
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
    companyCardId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    cardUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  comapnyCard.beforeValidate((comapnyCard, options) => {
    if (!comapnyCard.id) {
      comapnyCard.id = v4();
    }
  });

  return comapnyCard;
};
