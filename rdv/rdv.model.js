const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    rdvDate:{
        type:Date
    },
    note:{
        type:String
    },
    userid:{
        type:String
    },
    name:{
      type:String
    },
    candidateName :{
        type:String
    },
    profileId : {
        type:String
    }
   
});
mongoose.model('rdv', schema);

module.exports = mongoose.model('rdv');