const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const protectionForm = sequelize.define("protectionForm", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  protectionForm.beforeValidate((protectionForm, options) => {
    if (!protectionForm.id) {
      protectionForm.id = v4();
    }
  });

  return protectionForm;
};
