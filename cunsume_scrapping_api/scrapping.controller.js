const express = require('express');
const router = express.Router();

var Request = require("request");


router.post('/', (req, res) => {
    var data = "site:linkedin.com/in/ AND \"python developer\" AND \"LONDON\""
    var nbp ="1"
    var idf="52"
    var nidUser="7887"
    console.log(req.query)
    Request(`http://127.0.0.1:5001/?query=${req.query.query}&nbp=${req.query.nbp}&idf=${req.params.idf}&idUser=${req.params.idUser}`,
       function (error, response, body) {
         if (!error && response.statusCode == 200) {
             var parsedBody = JSON.parse(body);
             res.send(parsedBody)
 
         } else {
             console.log("error in the server")
         }
     }
 );
})







 module.exports = router;
