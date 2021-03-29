const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    folderName:{
        type:String
    },
    profiles: [{ type: Schema.Types.ObjectId, ref: 'Profile' }]
});
mongoose.model('folder', schema);

module.exports = mongoose.model('folder');