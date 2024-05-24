// const AWS = require("aws-sdk");
const multer = require("multer");
// const multerS3 = require("multer-s3");
// require("dotenv").config();
// // Configure AWS SDK with your credentials and region
// const s3 = new AWS.S3({
//   accessKeyId: process.env.ACCESS_KEY,
//   secretAccessKey: process.env.SECRET_ACCESS_KEY,
// });

// const BUCKET_NAME = process.env.BUCKET_NAME;

// // Create a multer storage for uploading files to S3
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: BUCKET_NAME,
//     acl: "public-read",
//     // contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: (req, file, cb) => {
//       cb(null, Date.now().toString() + "-" + file.originalname);
//     },
//   }),
//   limits: { fileSize: 5000000000 },
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Middleware for uploading a single file
const uploadSingle = (req, res, next) => {
  upload.single("icon")(req, res, (err) => {
    if (err) {
      // Handle upload error
      return res.status(400).json({ error: "Failed to upload file" });
    }

    let { body } = req.body;
    let icon = req.file.filename;

    req.body = { ...req.body, icon };

    next();
  });
};

// Middleware for deleting a file from S3
const deleteFile = (key) => {
  const params = {
    Bucket: "YOUR_BUCKET_NAME",
    Key: key,
  };

  s3.deleteObject(params, (err, data) => {
    if (err) {
      console.log("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
};

module.exports = {
  uploadSingle,
  deleteFile,
};
