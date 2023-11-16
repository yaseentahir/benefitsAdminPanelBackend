const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define("groups", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    price1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  groups.beforeValidate((groups, options) => {
    if (!groups.id) {
      groups.id = v4();
    }
  });

  return groups;
};
