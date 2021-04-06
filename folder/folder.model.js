const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    folderName:{
        type:String
    },
    description:{
        type:String
    },
    requete:{
        type:String
    },
    userid:{
        type:String
    },
   
});
mongoose.model('folder', schema);

module.exports = mongoose.model('folder');