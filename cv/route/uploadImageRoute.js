const ImageUploadRouter = require("express").Router();

const { UploadImage } = require("../controller/uploadImage");
const pdfcv_controller = require('../controller/uploadImage');

const parser = require("../middleware/cloudinary.config");

ImageUploadRouter.post("/image", parser.single("image"), UploadImage);

ImageUploadRouter.get('/pdfdownload', pdfcv_controller.downloadImage);

ImageUploadRouter.get('/allPdfCv', pdfcv_controller.pdf_Alldetails);

ImageUploadRouter.delete('/delete/:id', pdfcv_controller.pdf_delete);


module.exports = ImageUploadRouter;
