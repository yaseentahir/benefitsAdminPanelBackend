const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const faqs = sequelize.define("faqs", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    companyCardId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  faqs.beforeValidate((faqs, options) => {
    if (!faqs.id) {
      faqs.id = v4();
    }
  });

  return faqs;
};
