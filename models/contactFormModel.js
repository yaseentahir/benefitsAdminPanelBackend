const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const contactForm = sequelize.define("contactForm", {
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

  contactForm.beforeValidate((contactForm, options) => {
    if (!contactForm.id) {
      contactForm.id = v4();
    }
  });

  return contactForm;
};
