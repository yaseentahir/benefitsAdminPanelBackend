const db = require("../models/index");
const CustomError = require("../helpers/customError");

const ProtectionForm = db.protectionForm;

exports.postData = async (req, res, next) => {
  const { body } = req;

  try {
    if (!body) {
      throw new CustomError(400, "Missing body parameters!");
    }
    const protectionForm = await ProtectionForm.create({ ...body });

    if (!protectionForm) {
      throw new CustomError(404, "Some Error occured form not submitted.");
    } else
      res.status(200).send({
        error: false,
        data: protectionForm,
      });
  } catch (err) {
    next(err);
  }
};
exports.getAllProtectionForms = async (req, res, next) => {
  try {
    const protectionForms = await ProtectionForm.findAll({});

    if (!protectionForms) {
      throw new CustomError(404, "Protection Forms not Found!");
    } else
      res.send({
        error: false,
        data: protectionForms,
      });
  } catch (err) {
    next(err);
  }
};

exports.deleteProtectionForm = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }
    const affectedRows = await ProtectionForm.destroy({ where: { id } });

    if (affectedRows == 0) {
      throw new CustomError(
        400,
        "Some Error occured Protection Form not deleted!"
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
