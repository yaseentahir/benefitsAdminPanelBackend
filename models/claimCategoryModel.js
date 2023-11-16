const { v4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define("categories", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    // category: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        return this.getDataValue("category").split(";");
      },
      set(val) {
        this.setDataValue("category", val.join(";"));
      },
    },
  });

  categories.beforeValidate((categories, options) => {
    if (!categories.id) {
      categories.id = v4();
    }
  });

  return categories;
};
