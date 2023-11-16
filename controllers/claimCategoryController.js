const db = require("../models/index");
const CustomError = require("../helpers/customError");

const Category = db.claimCategory;

exports.postCategory = async (req, res, next) => {
  const { body } = req;

  try {
    if (!body) {
      throw new CustomError(400, "Missing body parameters!");
    }
    const category = await Category.create({ ...body });

    if (!category) {
      throw new CustomError(404, "Some Error occured category not created!");
    } else
      res.status(200).send({
        error: false,
        data: category,
      });
  } catch (err) {
    next(err);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const category = await Category.findAll({});

    if (!category) {
      throw new CustomError(404, "Categories not Found!");
    } else
      res.send({
        error: false,
        data: category,
      });
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }
    const affectedRows = await Category.destroy({ where: { id } });

    if (affectedRows == 0) {
      throw new CustomError(400, "Some Error occured claim not deleted!");
    } else
      res.status(200).send({
        error: false,
        data: [],
      });
  } catch (err) {
    next(err);
  }
};
