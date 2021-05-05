const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageUpload = new Schema({
  
    image: { type: String, required: true },  
    
    email: {type: String, required: true, max: 100},
  
  
    desc: {type: String, required: true, max: 100}
    
  
}, { timestamps: true }

);

module.exports = mongoose.model("imageUpload", ImageUpload);
