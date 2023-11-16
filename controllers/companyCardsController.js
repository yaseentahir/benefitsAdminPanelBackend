const db = require("../models/index");
const CustomError = require("../helpers/customError");
const iconUploaderHelper = require("../helpers/icon");
const { deleteFileS3 } = require("../moddlewares/icon-uploader");

const CompanyCard = db.companyCardModel;

// Return all Company cards
exports.getAllCompanyCards = async (req, res, next) => {
  try {
    const companycards = await CompanyCard.findAll({});

    if (!companycards) {
      throw new CustomError(404, "Company cards not Found!");
    } else
      res.send({
        error: false,
        data: companycards,
      });
  } catch (err) {
    next(err);
  }
};

// Return Single Company Card
exports.getCompanyCard = async (req, res, next) => {
  const companyCardId = req.params.id;
  try {
    if (!companyCardId) {
      throw new CustomError(400, "Missing id parameter!");
    }
    const companycard = await CompanyCard.findAll({ where: { companyCardId } });

    if (!companycard) {
      throw new CustomError(404, "Company card not Found!");
    } else
      res.status(200).send({
        error: false,
        data: companycard,
      });
  } catch (err) {
    next(err);
  }
};

// // Return Single Company Card
// exports.getCompanyCard = async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     if (!id) {
//       throw new CustomError(400, "Missing id parameter!");
//     }
//     const companycard = await CompanyCard.findOne({ where: { id } });

//     if (!companycard) {
//       throw new CustomError(404, "Company card not Found!");
//     } else
//       res.status(200).send({
//         error: false,
//         data: companycard,
//       });
//   } catch (err) {
//     next(err);
//   }
// };

// Post Single Company card
exports.postCompanyCard = async (req, res, next) => {
  let { body, file } = req;

  try {
    if (!body) {
      throw new CustomError(400, "Missing body parameters!");
    }

    if (!file) {
      // throw new CustomError(400, "Missing file parameters!");
      if (body.icon) {
        delete body.icon;
      }
      const companycard = await CompanyCard.create({ ...body });

      if (!companycard) {
        throw new CustomError(
          404,
          "Some Error occured company card not created!"
        );
      } else
        return res.status(200).send({
          error: false,
          data: companycard,
        });
    } else {
      let uploadedPath = await iconUploaderHelper(file);

      body = { ...req.body, icon: file.filename, iconUrl: uploadedPath };

      const companycard = await CompanyCard.create({ ...body });

      if (!companycard) {
        throw new CustomError(
          404,
          "Some Error occured company card not created!"
        );
      } else
        return res.status(200).send({
          error: false,
          data: companycard,
        });
    }
  } catch (err) {
    next(err);
  }
};

// Put Single Company Card
exports.putCompanyCard = async (req, res, next) => {
  const id = req.params.id;
  let { body, file } = req;

  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }
    if (!body) {
      throw new CustomError(400, "Missing body parameters!");
    }
    if (!file) {
      // throw new CustomError(400, "Missing file parameters!");
      if (body.icon) {
        delete body.icon;
      }
      if (body.iconUrl) {
        delete body.iconUrl;
      }
      const affectedRows = await CompanyCard.update(
        { ...body },
        { where: { id } }
      );

      if (affectedRows == 0) {
        throw new CustomError(
          400,
          "Some Error occured company card not updated!"
        );
      } else
        return res.status(200).send({
          error: false,
          data: [],
        });
    } else {
      let uploadedPath = await iconUploaderHelper(file);

      body = { ...req.body, icon: file.filename, iconUrl: uploadedPath };

      // deleting previous icon

      const company = await CompanyCard.findOne({ where: { id } });

      if (company.iconUrl) {
        let key = company.iconUrl.split("/").pop();
        key = "icons/" + key;
        deleteFileS3(key)
          .then(() => {
            console.log("File deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting file:", error);
            throw new CustomError(
              400,
              "Some Error occured Company Link not deleted!"
            );
          });
      }

      const affectedRows = await CompanyCard.update(
        { ...body },
        { where: { id } }
      );

      if (affectedRows == 0) {
        throw new CustomError(
          400,
          "Some Error occured company card not updated!"
        );
      } else
        return res.status(200).send({
          error: false,
          data: [],
        });
    }
  } catch (err) {
    next(err);
  }
};

// Delete Single Company Card
exports.deleteCompanyCard = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }

    const company = await CompanyCard.findOne({ where: { id } });

    if (!company) {
      throw new CustomError(404, "Not Found!");
    }

    let key = company.iconUrl.split("/").pop();
    key = "icons/" + key;
    deleteFileS3(key)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
        throw new CustomError(
          400,
          "Some Error occured Company Link not deleted!"
        );
      });

    const affectedRows = await CompanyCard.destroy({ where: { id } });

    if (affectedRows == 0) {
      throw new CustomError(
        400,
        "Some Error occured company card not deleted!"
      );
    } else
      res.status(200).send({
        error: false,
        data: [affectedRows],
      });
  } catch (err) {
    next(err);
  }
};
