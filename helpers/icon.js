const path = require("path");
const {
  uploadFileS3,
  deleteLocalFile,
} = require("../moddlewares/icon-uploader");

const directoryPath = "../uploads";
const absolutePath = path.resolve(__dirname, directoryPath);

const iconUploaderHelper = async (file) => {
  let icon = file.filename;

  let filePath = path.join(absolutePath, icon);

  let uploadedPath = await uploadFileS3(filePath, icon, "icons");

  deleteLocalFile(icon);

  return uploadedPath;
};

module.exports = iconUploaderHelper;
