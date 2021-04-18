const express = require('express');
const router = express.Router();
const multer = require("multer");


const upload = require('./pdfcv.controller');





router.post("/photo", upload.single('photo'), (req, res, next) => {
  
    return res.json({
        image: req.file.path
    });
});
//router.get('/:id', pdfcv_controller.pdf_details);
//router.post('/pdf_upload', pdfcv_controller.pdf_upload);
module.exports = router;