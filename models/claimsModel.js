const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const claims = sequelize.define("claims", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    companyCardId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    edi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  claims.beforeValidate((claims, options) => {
    if (!claims.id) {
      claims.id = v4();
    }
  });

  return claims;
};
