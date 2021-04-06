const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const pdfcv_controller = require('./pdfcv.controller');


// a simple test url to check that all of our files are communicating correctly.
//router.get('/test', pdfcv_controller.test);
router.post('/pdf_create', pdfcv_controller.pdf_create);
router.get('/:id', pdfcv_controller.pdf_details);
//router.post('/pdf_upload', pdfcv_controller.pdf_upload);
module.exports = router;