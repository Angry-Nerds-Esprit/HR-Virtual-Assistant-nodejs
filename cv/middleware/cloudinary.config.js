const multer = require("multer");

const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const {
  CLOUDINARY_HOST,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

cloudinary.config({
  cloud_name: 'esprit-uploads',
  api_key: '345683978923333',
  api_secret: 'LVyh85uopguqZMwJ5r6dgRu0aF4',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Pdfcv",
    format: async () => "png",
    public_id: (req, file) => file.filename,
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
