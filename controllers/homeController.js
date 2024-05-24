const db = require("../models/index");
const CustomError = require("../helpers/customError");

const iconUploaderHelper = require("../helpers/icon");
const { deleteFileS3 } = require("../middlewares/icon-uploader");

const HomeCard = db.homeCards;

// Return all companies
exports.getAllHomeCards = async (req, res, next) => {
  try {
    const cards = await HomeCard.findAll({});

    if (!cards) {
      throw new CustomError(404, "Cards not Found!");
    } else
      res.send({
        error: false,
        data: cards,
      });
  } catch (err) {
    next(err);
  }
};

//TODO : Need Modification if ever used the code below

// Return Single Company
// exports.getCard = async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     if (!id) {
//       throw new CustomError(400, "Missing id parameter!");
//     }
//     const company = await Company.findOne({ where: { id } });

//     if (!company) {
//       throw new CustomError(404, "Comapany not Found!");
//     } else
//       res.status(200).send({
//         error: false,
//         data: company,
//       });
//   } catch (err) {
//     next(err);
//   }
// };

// Post Single Home Card
exports.postHomeCard = async (req, res, next) => {
  let { body, file } = req;

  try {
    if (!body) {
      throw new CustomError(400, "Missing body parameters!");
    }

    if (!file) {
      // throw new CustomError(400, "Missing icon file!");
      if (body.icon) {
        delete body.icon;
      }
      const card = await HomeCard.create({ ...body });

      if (!card) {
        throw new CustomError(404, "Some Error occured card not created!");
      } else
        return res.status(200).send({
          error: false,
          data: card,
        });
    } else {
      let uploadedPath = await iconUploaderHelper(file);

      body = { ...req.body, icon: file.filename, iconUrl: uploadedPath };

      const card = await HomeCard.create({ ...body });

      if (!card) {
        throw new CustomError(404, "Some Error occured card not created!");
      } else
        return res.status(200).send({
          error: false,
          data: card,
        });
    }
  } catch (err) {
    next(err);
  }
};

// Put Single Card
exports.putHomeCard = async (req, res, next) => {
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
      const affectedRows = await HomeCard.update(
        { ...body },
        { where: { id } }
      );

      if (affectedRows == 0) {
        throw new CustomError(400, "Some Error occured Home Card not updated!");
      } else
        return res.status(200).send({
          error: false,
          data: [],
        });
    } else {
      let uploadedPath = await iconUploaderHelper(file);

      body = { ...req.body, icon: file.filename, iconUrl: uploadedPath };

      // delete previous icon

      const homecard = await HomeCard.findOne({ where: { id } });

      if (homecard.iconUrl) {
        let key = homecard.iconUrl.split("/").pop();
        key = "icons/" + key;
        deleteFileS3(key)
          .then(() => {
            console.log("File deleted successfully");
          })
          .catch((error) => {
            console.error("Error deleting file:", error);
            throw new CustomError(
              400,
              "Some Error occured Home Card not deleted!"
            );
          });
      }

      const affectedRows = await HomeCard.update(
        { ...body },
        { where: { id } }
      );

      if (affectedRows == 0) {
        throw new CustomError(400, "Some Error occured Home Card not updated!");
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

// Delete Single Company
exports.deleteHomeCard = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }

    const homecard = await HomeCard.findOne({ where: { id } });

    if (!homecard) {
      throw new CustomError(404, "Not Found!");
    }
    let key = homecard.iconUrl.split("/").pop();
    key = "icons/" + key;
    deleteFileS3(key)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
        throw new CustomError(400, "Some Error occured Home Card not deleted!");
      });

    const affectedRows = await HomeCard.destroy({ where: { id } });

    if (affectedRows == 0) {
      throw new CustomError(400, "Some Error occured Home Card not deleted!");
    } else
      res.status(200).send({
        error: false,
        data: [affectedRows],
      });
  } catch (err) {
    next(err);
  }
};
