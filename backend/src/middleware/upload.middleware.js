const multer = require("multer");
const httpError = require("../utils/httpError");

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

function fileFilter(req, file, callback) {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(httpError(400, "Only JPG, PNG, and WEBP images are allowed."));
  }
  return callback(null, true);
}

function createImageUpload() {
  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024, files: 1 },
    fileFilter,
  });
}

module.exports = {
  createImageUpload,
};
