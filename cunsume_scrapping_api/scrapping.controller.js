const express = require('express');
const router = express.Router();

var Request = require("request");



router.post('/changeAccount', (req, res) => {
    console.log(req.body)
    Request.post({url:`http://127.0.0.1:5001/changeAccount?query=${req.query.query}&nbp=${req.query.nbp}&idf=${req.query.idf}&idUser=${req.query.idUser}`,json: req.body,
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var parsedBody = JSON.parse(body);
                res.send(parsedBody)
    
            } else {
                console.log("error when scrapping")
            }
        }
    })})
    router.post('/', (req, res) => {
        Request.post(`http://localhost:5001/?query=${req.query.query}&nbp=${req.query.nbp}&idf=${req.query.idf}&idUser=${req.query.idUser}`,
              function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var parsedBody = JSON.parse(body);
                    res.send(parsedBody)
        
                } else {
                    console.log("error when scrapping")
                }
            }
        );
       }) 







 module.exports = router;
