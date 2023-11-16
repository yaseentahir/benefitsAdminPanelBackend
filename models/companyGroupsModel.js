module.exports = (sequelize, DataTypes) => {
  const companygroup = sequelize.define(
    "companygroups",
    {},
    { timestamps: false }
  );
  return companygroup;
};
