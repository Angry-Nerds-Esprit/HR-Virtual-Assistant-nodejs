const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PdfcvSchema = new Schema({
    email: {type: String, required: true, max: 100},
    filepath: {type: String, required: true, max: 100},
    desc: {type: String, required: true, max: 100}
});


// Export the model
module.exports = mongoose.model('Pdfcv', PdfcvSchema);


