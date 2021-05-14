require('rootpath')();
require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const ImageUploadRouter = require("./cv/route/uploadImageRoute");
const path= require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(cors());


// use JWT auth to secure the api
//sapp.use(jwt());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
 app.use('/users', require('./users/users.controller'));
app.use('/profiles', require('./profile_mangement/profile.controller'));
app.use('/folder',require('./folder/folder.controller'));
app.use('/scrape',require('./cunsume_scrapping_api/scrapping.controller')); 
app.use('/rdv',require('./rdv/rdv.controller'));
app.use("/api", ImageUploadRouter);

// global error handler
//app.use(errorHandler);

// start server
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/client/build')))
    app.get('*',cors,(req,res)=>{
        res.sendFile(__dirname,'client','build','index.html')
    });
}

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port +'with mode '+ process.env.NODE_ENV + process.env.baseURL);
});
