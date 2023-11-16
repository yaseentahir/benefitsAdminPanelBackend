const db = require("../models/index");
const CustomError = require("../helpers/customError");
const iconUploaderHelper = require("../helpers/icon");
const { deleteFileS3 } = require("../moddlewares/icon-uploader");
const Companylink = db.companyLinksModel;
const Card = db.homeCards;
const Company = db.companyCardModel;
const Group = db.groupModel;
const CompanyGroup = db.companygroup;

// Return all Company links
exports.getAllLinks = async (req, res, next) => {
  try {
    const companylinks = await Companylink.findAll({
      include: [
        {
          model: Card,
          as: "card",
        },
        {
          model: Company,
          as: "company",
        },
        Group,
      ],
    });

    if (!companylinks) {
      throw new CustomError(404, "Company links not Found!");
    } else
      res.send({
        error: false,
        data: companylinks,
      });
  } catch (err) {
    next(err);
  }
};

// Return internal links

exports.getAllInternalLinks = async (req, res, next) => {
  try {
    const companylinks = await Companylink.findAll({
      where: { isExternal: false },
    });
    console.log(companylinks);
    if (!companylinks) {
      throw new CustomError(404, "Company links not Found!");
    } else
      res.send({
        error: false,
        data: companylinks,
      });
  } catch (err) {
    next(err);
  }
};

// Return Single Company link
exports.getLink = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }
    const companylink = await Companylink.findOne({
      where: { id },
      include: [
        {
          model: Card,
          as: "card",
        },
        {
          model: Company,
          as: "company",
        },
        Group,
      ],
    });

    if (!companylink) {
      throw new CustomError(404, "Company link not Found!");
    } else
      res.status(200).send({
        error: false,
        data: companylink,
      });
  } catch (err) {
    next(err);
  }
};

// Post Single Company link
exports.postLink = async (req, res, next) => {
  let { body, file } = req;
  try {
    if (!body) {
      throw new CustomError(400, "Missing body parameters!");
    }
    if (req.file) {
      let uploadedPath = await iconUploaderHelper(file);

      body = { ...req.body, icon: file.filename, iconUrl: uploadedPath };
    } else {
      body = { ...req.body, icon: null, iconUrl: null };
    }

    const companylink = await Companylink.create({ ...body });

    let groupIds = body.groupId.split(",");

    for (let i = 0; i < groupIds.length; i++) {
      const group = await Group.findOne({
        where: {
          id: groupIds[i],
        },
      });

      await companylink.addGroup(group, { through: CompanyGroup });
    }
    if (!companylink) {
      throw new CustomError(
        404,
        "Some Error occured company card not created!"
      );
    } else
      res.status(200).send({
        error: false,
        data: companylink,
      });
  } catch (err) {
    next(err);
  }
};

// Put Single Company link
exports.putLink = async (req, res, next) => {
  const id = req.params.id;
  let { body, file } = req;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }
    if (!body) {
      throw new CustomError(400, "Missing body parameters!");
    }

    if (req.file) {
      let uploadedPath = await iconUploaderHelper(file);

      body = { ...req.body, icon: file.filename, iconUrl: uploadedPath };
    } else {
      if (body.icon) {
        delete body.icon;
      }
      if (body.iconUrl) {
        delete body.iconUrl;
      }
      body = { ...req.body };
    }

    const prevIdsDeletedRows = await CompanyGroup.destroy({
      where: {
        companylinkId: id,
      },
    });

    const companylink = await Companylink.findOne({ where: { id } });

    if (companylink.icon && companylink.iconUrl) {
      let key = companylink.iconUrl.split("/").pop();
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

    let groupIds = body.groupId.split(",");

    for (let i = 0; i < groupIds.length; i++) {
      const group = await Group.findOne({
        where: {
          id: groupIds[i],
        },
      });

      await companylink.addGroup(group, { through: CompanyGroup });
    }

    const affectedRows = await Companylink.update(
      { ...body },
      { where: { id } }
    );

    if (affectedRows == 0) {
      throw new CustomError(
        400,
        "Some Error occured company link not updated!"
      );
    } else
      res.status(200).send({
        error: false,
        data: [],
      });
  } catch (err) {
    next(err);
  }
};

// Delete Single Company link
exports.deleteLink = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new CustomError(400, "Missing id parameter!");
    }

    const company = await Companylink.findOne({ where: { id } });

    if (!company) {
      throw new CustomError(404, "Not Found!");
    }

    if (company.iconUrl !== null) {
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

    const affectedRows = await Companylink.destroy({ where: { id } });

    if (affectedRows == 0) {
      throw new CustomError(
        400,
        "Some Error occured company link not deleted!"
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
