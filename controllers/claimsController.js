const db = require("../models/index");
const CustomError = require("../helpers/customError");

const Claim = db.companyClaims;

// Return all Claims
exports.getAllClaims = async (req, res, next) => {
  try {
    const claims = await Claim.findAll({
      include: [
        {
          model: db.companyLinksModel,
          as: "claimCompany",
        },
      ],
    });

    if (!claims) {
      throw new CustomError(404, "Claims not Found!");
    } else
      res.send({
        error: false,
        data: claims,
      });
  } catch (err) {
    next(err);
  }
};

// Return Single Claim
exports.getClaim = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }
    const claim = await Claim.findOne({ where: { companyCardId: id } });

    if (!claim) {
      throw new CustomError(404, "Claim not Found!");
    } else
      res.status(200).send({
        error: false,
        data: claim,
      });
  } catch (err) {
    next(err);
  }
};

// Post Single Claim
exports.postClaim = async (req, res, next) => {
  const { body } = req;

  try {
    if (!body) {
      throw new CustomError(400, "Missing body parameters!");
    }
    const claim = await Claim.create({ ...body });

    if (!claim) {
      throw new CustomError(404, "Some Error occured claim not created!");
    } else
      res.status(200).send({
        error: false,
        data: claim,
      });
  } catch (err) {
    next(err);
  }
};

// Put Single Claim
exports.putClaim = async (req, res, next) => {
  const id = req.params.id;
  const { body } = req;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }
    if (!body) {
      throw new CustomError(400, "Missing body parameters!");
    }

    const affectedRows = await Claim.update({ ...body }, { where: { id } });

    if (affectedRows == 0) {
      throw new CustomError(400, "Some Error occured claim not updated!");
    } else
      res.status(200).send({
        error: false,
        data: [],
      });
  } catch (err) {
    next(err);
  }
};

// Delete Single Claim
exports.deleteClaim = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }
    const affectedRows = await Claim.destroy({ where: { id } });

    if (affectedRows == 0) {
      throw new CustomError(400, "Some Error occured claim not deleted!");
    } else
      res.status(200).send({
        error: false,
        data: [affectedRows],
      });
  } catch (err) {
    next(err);
  }
};
