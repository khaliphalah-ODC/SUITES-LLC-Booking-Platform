const httpError = require("../utils/httpError");
const env = require("../config/env");
const { cloudinary, isCloudinaryConfigured } = require("../config/cloudinary");

function uploadBufferToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: env.cloudinary.folder,
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );

    stream.end(file.buffer);
  });
}

async function uploadImage(req, res) {
  if (!req.file) {
    throw httpError(400, "Image file is required.");
  }

  if (!isCloudinaryConfigured()) {
    throw httpError(503, "Cloudinary is not configured. Add Cloudinary environment variables.");
  }

  const uploaded = await uploadBufferToCloudinary(req.file);

  res.status(201).json({
    image: {
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
      original_name: req.file.originalname,
      mime_type: req.file.mimetype,
      size: req.file.size,
      width: uploaded.width,
      height: uploaded.height,
    },
  });
}

module.exports = {
  uploadImage,
};
