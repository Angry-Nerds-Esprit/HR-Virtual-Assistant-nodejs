const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PdfcvSchema = new Schema({
    email: {type: String, required: true, max: 100},
    filepath: {type: String, required: true, max: 100},
    desc: {type: String, required: true, max: 100}
});


// Export the model
module.exports = mongoose.model('Pdfcv', PdfcvSchema);

const path = require('path');
const express = require('express');
const multer  = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/uploads')
    },
    filename: function (req, file, cb) {
        // You could rename the file name
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))

        // You could use the original name
        cb(null, file.originalname)
    }
});

var upload = multer({storage: storage})

const router = express.Router();
