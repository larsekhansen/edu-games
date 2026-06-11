require("dotenv").config();

const { v2: cloudinary } = require("cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const allowedMimeTypes = new Set(["image/jpeg", "image/png"]);

const uploadCloud = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.has(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(new Error("Only JPG and PNG files are allowed"));
  },
});

const uploadImage = (fileBuffer, originalname) => new Promise((resolve, reject) => {
  const timestamp = Date.now();
  const publicId = originalname
    ? `${timestamp}-${originalname.replace(/[^a-zA-Z0-9._-]/g, "-")}`
    : `${timestamp}`;

  const stream = cloudinary.uploader.upload_stream(
    {
      folder: "edu-fun",
      public_id: publicId,
      resource_type: "image",
    },
    (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(result);
    }
  );

  stream.end(fileBuffer);
});

module.exports = {
  uploadCloud,
  uploadImage,
};