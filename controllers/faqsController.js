const db = require("../models/index");
const CustomError = require("../helpers/customError");

const Faq = db.companyFaqs;
const Companylink = db.companyLinksModel;
// Return all Faqs
exports.getAllFaqs = async (req, res, next) => {
  try {
    const faqs = await Faq.findAll({
      include: [
        {
          model: Companylink,
          as: "companyFaqs",
        },
      ],
    });

    if (!faqs) {
      throw new CustomError(404, "Faqs not Found!");
    } else
      res.send({
        error: false,
        data: faqs,
      });
  } catch (err) {
    next(err);
  }
};

// Return Single Faq
exports.getFaq = async (req, res, next) => {
  const companyCardId = req.params.id;
  try {
    if (!companyCardId) {
      throw new CustomError(400, "Missing id parameter!");
    }
    const faq = await Faq.findAll({
      where: { companyCardId },
      include: [
        {
          model: Companylink,
          as: "companyFaqs",
        },
      ],
    });

    if (!faq) {
      throw new CustomError(404, "Faq not Found!");
    } else
      res.status(200).send({
        error: false,
        data: faq,
      });
  } catch (err) {
    next(err);
  }
};

// Post Single Faq
exports.postFaq = async (req, res, next) => {
  const { body } = req;
  try {
    if (!body) {
      throw new CustomError(400, "Missing body parameters!");
    }
    const faq = await Faq.create({ ...body });

    if (!faq) {
      throw new CustomError(404, "Some Error occured Faq not created!");
    } else
      res.status(200).send({
        error: false,
        data: faq,
      });
  } catch (err) {
    next(err);
  }
};

// Put Single Faq
exports.putFaq = async (req, res, next) => {
  const id = req.params.id;
  const { body } = req;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }
    if (!body) {
      throw new CustomError(400, "Missing body parameters!");
    }

    const affectedRows = await Faq.update({ ...body }, { where: { id } });

    if (affectedRows == 0) {
      throw new CustomError(400, "Some Error occured Faq not updated!");
    } else
      res.status(200).send({
        error: false,
        data: [],
      });
  } catch (err) {
    next(err);
  }
};

// Delete Single Faq
exports.deleteFaq = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }
    const affectedRows = await Faq.destroy({ where: { id } });

    if (affectedRows == 0) {
      throw new CustomError(400, "Some Error occured Faq not deleted!");
    } else
      res.status(200).send({
        error: false,
        data: [affectedRows],
      });
  } catch (err) {
    next(err);
  }
};
