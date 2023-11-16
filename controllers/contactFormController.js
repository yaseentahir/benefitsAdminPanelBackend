const db = require("../models/index");
const CustomError = require("../helpers/customError");

const ContactForm = db.contactForm;

exports.postData = async (req, res, next) => {
  const { body } = req;

  try {
    if (!body) {
      throw new CustomError(400, "Missing body parameters!");
    }
    const contactForm = await ContactForm.create({ ...body });

    if (!contactForm) {
      throw new CustomError(404, "Some Error occured form not submitted.");
    } else
      res.status(200).send({
        error: false,
        data: contactForm,
      });
  } catch (err) {
    next(err);
  }
};

exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await ContactForm.findAll({});

    if (!contacts) {
      throw new CustomError(404, "Contact Forms not Found!");
    } else
      res.send({
        error: false,
        data: contacts,
      });
  } catch (err) {
    next(err);
  }
};

exports.deleteContact = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }
    const affectedRows = await ContactForm.destroy({ where: { id } });

    if (affectedRows == 0) {
      throw new CustomError(400, "Some Error occured Contact not deleted!");
    } else
      res.status(200).send({
        error: false,
        data: [affectedRows],
      });
  } catch (err) {
    next(err);
  }
};
