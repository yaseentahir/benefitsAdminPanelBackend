// links below home card
const { v4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  const companylink = sequelize.define("companylink", {
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
    linkName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isExternal: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // isCompany: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
    linkUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    groupId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    homeCardId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    backgroundColor: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "#ffffff",
    },
  });

  companylink.beforeValidate((companylink, options) => {
    if (!companylink.id) {
      companylink.id = v4();
    }
  });

  return companylink;
};
