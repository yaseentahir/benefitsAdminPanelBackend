const db = require("../models/index");
const CustomError = require("../helpers/customError");

const Group = db.groupModel;

// Return all Groups
exports.getAllGroups = async (req, res, next) => {
  try {
    const groups = await Group.findAll({});

    if (!groups) {
      throw new CustomError(404, "Claims not Found!");
    } else
      res.send({
        error: false,
        data: groups,
      });
  } catch (err) {
    next(err);
  }
};

// Return Single Group
exports.getGroup = async (req, res, next) => {
  const groupId = req.params.id;
  try {
    if (!groupId) {
      throw new CustomError(400, "Missing id parameter!");
    }
    const group = await Group.findOne({ where: { groupId } });

    if (!group) {
      throw new CustomError(404, "Group not Found!");
    } else
      res.status(200).send({
        error: false,
        data: group,
      });
  } catch (err) {
    next(err);
  }
};

// Post Single Group
exports.postGroup = async (req, res, next) => {
  const { body } = req;
  try {
    if (!body) {
      throw new CustomError(400, "Missing body parameters!");
    }
    const group = await Group.create({ ...body });

    if (!group) {
      throw new CustomError(404, "Some Error occured Group not created!");
    } else
      res.status(200).send({
        error: false,
        data: group,
      });
  } catch (err) {
    next(err);
  }
};

// Put Single Group
exports.putGroup = async (req, res, next) => {
  const id = req.params.id;
  const { body } = req;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }
    if (!body) {
      throw new CustomError(400, "Missing body parameters!");
    }

    const affectedRows = await Group.update({ ...body }, { where: { id } });

    if (affectedRows == 0) {
      throw new CustomError(400, "Some Error occured Group not updated!");
    } else
      res.status(200).send({
        error: false,
        data: [],
      });
  } catch (err) {
    next(err);
  }
};

// Delete Single Group
exports.deleteGroup = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }
    const affectedRows = await Group.destroy({ where: { id } });

    if (affectedRows == 0) {
      throw new CustomError(400, "Some Error occured Group not deleted!");
    } else
      res.status(200).send({
        error: false,
        data: [affectedRows],
      });
  } catch (err) {
    next(err);
  }
};
