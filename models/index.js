const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const basename = path.basename(__filename);
const fs = require("fs");
require("dotenv").config(path.resolve(__dirname, "../.env"));

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    operatorsAliases: 0,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model1 = require(`./${path.basename(file)}`);
    const model = model1(sequelize, Sequelize);
    db[model.name] = model;
  });
db.sequelize = sequelize;
db.Sequelize = Sequelize;
sequelize.sync().then(() => {
  console.log(`Database & tables created!`);
});

db.claimCategory = require("./claimCategoryModel")(sequelize, DataTypes);
db.companyCardModel = require("./companyCardsModel")(sequelize, DataTypes);
db.companyLinksModel = require("./companyLinksModel")(sequelize, DataTypes);
db.companyFaqs = require("./faqModel")(sequelize, DataTypes);
db.groupModel = require("./groupModel")(sequelize, DataTypes);
db.homeCards = require("./homeCardsModel")(sequelize, DataTypes);
db.companyClaims = require("./claimsModel")(sequelize, DataTypes);
db.userModel = require("./userModel")(sequelize, DataTypes);
db.companygroup = require("./companyGroupsModel")(sequelize, DataTypes);

// homeCards and CompanyLinksModel
db.homeCards.hasMany(db.companyLinksModel, {
  foreignKey: "homeCardId",
  as: "card",
});
db.companyLinksModel.belongsTo(db.homeCards, {
  foreignKey: "homeCardId",
  as: "card",
});

// homeCards and CompanyLinksModel
db.companyLinksModel.hasMany(db.companyCardModel, {
  foreignKey: "companyCardId",
  as: "company",
});
db.companyCardModel.belongsTo(db.companyLinksModel, {
  foreignKey: "companyCardId",
  as: "company",
});

// faqs and CompanyLinksModel
db.companyLinksModel.hasMany(db.companyFaqs, {
  foreignKey: "companyCardId",
  as: "companyFaqs",
});
db.companyFaqs.belongsTo(db.companyLinksModel, {
  foreignKey: "companyCardId",
  as: "faqCompany",
});
// categories and CompanyLinksModel
db.companyLinksModel.hasMany(db.claimCategory, {
  foreignKey: "companyCardId",
  as: "category",
});
db.companyFaqs.belongsTo(db.companyLinksModel, {
  foreignKey: "companyCardId",
  as: "companyFaqs",
});

// claims and CompanyLinksModel
db.companyLinksModel.hasMany(db.companyClaims, {
  foreignKey: "companyCardId",
  as: "claims",
});
db.companyClaims.belongsTo(db.companyLinksModel, {
  foreignKey: "companyCardId",
  as: "claimCompany",
});

// many to many relationship between company links and groups

db.groupModel.belongsToMany(db.companyLinksModel, { through: db.companygroup });
db.companyLinksModel.belongsToMany(db.groupModel, { through: db.companygroup });

module.exports = db;
