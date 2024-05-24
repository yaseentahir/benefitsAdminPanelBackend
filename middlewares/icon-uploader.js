const fs = require("fs");
const AWS = require("aws-sdk");
const multer = require("multer");
const path = require("path");
const CustomError = require("../helpers/customError");

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
const BUCKET_NAME = "surecare-benefits-icons";

exports.uploadFileS3 = function (filePath, fileName, destination) {
  return new Promise((resolve, reject) => {
    const fileContent = fs.readFileSync(filePath);

    const params = {
      Bucket: BUCKET_NAME,
      Key: `${destination}/${fileName}`,
      Body: fileContent,
    };

    s3.upload(params, function (err, data) {
      if (err) reject(new Error(err));
      resolve(data.Location);
    });
  });
};

exports.deleteFileS3 = function (key) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: key,
    };

    s3.deleteObject(params, function (err, data) {
      if (err) reject(new Error(err));
      resolve(`Object ${key} deleted successfully`);
    });
  });
};

exports.deleteLocalFile = function (fileName) {
  return new Promise((resolve, reject) => {
    fs.unlink(`./uploads/${fileName}`, function (err) {
      if (err) reject(new Error(err));
      resolve(true);
    });
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.split(".")[0].trim() +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});
// exports.upload = multer({
//   storage: storage,
//   limits: { fileSize: 5000000 },
// }).single("icon");

exports.upload = (req, res, next) => {
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
  }).single("icon");

  try {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          throw new CustomError(403, "File size exceeds the limit");
        }
      } else if (err) {
        throw new CustomError(
          500,
          "Some thing went wrong while uploading the file"
        );
      }

      if (!req.file) {
        return next();
      }

      next();
    });
  } catch (error) {
    throw new CustomError(
      500,
      "Some thing went wrong while uploading the file"
    );
  }
};
