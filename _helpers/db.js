const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Profile :require('../profile_mangement/profile.model'),
    Folder: require('../folder/folder.model'),
    Rdv: require('../rdv/rdv.model')
};