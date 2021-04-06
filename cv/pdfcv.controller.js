const Pdfcv = require('./Pdfcv.models');
let fs = require('fs'),
PDFParser = require("pdf2json");


const multer = require("multer");

const {TesseractWorker} = require('tesseract.js');

const worker = new TesseractWorker();

const email = require('node-email-extractor').default;

var uwords = require('uwords');

// storage
const storage = multer.diskStorage(
    {
        destination : (req,file,cb) => {
            cb(null,"./uploads");
        },
        filename : (req,file,cb) => {
            cb(null,file.originalname);
        }
     
    }
);
const upload = multer({storage : storage}).single("avatar");



exports.pdf_create = function (req, res) {
    
    upload(req,res,err => {
        fs.readFile(`./uploads/${req.file.originalname}`, (err , data ) => {
            if(err) return console.log("i am not uploading",err);
            
            worker
            .recognize(data, "eng" , { tessjs_create_pdf : '1' },{tessedit_pageseg_mode: '1' } )
            .progress(progress => {
                console.log(progress);
            })
            .then(result => {
              console.log(req.file.originalname);
              const file = `./tesseract.js-ocr-result.pdf`;
 
              // Set up the pdf parser
              let pdfParser = new PDFParser(this, 1);
              pdfParser.loadPDF(file);
              // On data ready
               pdfParser.on("pdfParser_dataReady", (pdfData) => {
                      // The raw PDF data in text form
                      const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
                      if(raw !== null) {
                          var data = email.text(raw);
                          console.log(data);
                          console.log(data["emails"][0]);
                          var words = uwords(raw);
                       
                          const keywordArr = ['php', 'french'];
                           
                          const message = words;
                          let name = keywordArr.reduce((r,v) => message.toString().toLowerCase().includes(v.toLowerCase()) && v || r, '')

                          console.log(name);

                          let pdfcv = new Pdfcv(
                            {
                                email: data["emails"][0],
                                filepath: req.file.originalname,
                                desc:name,
                            }
                        );
                    
                        pdfcv.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            res.send('Product Created successfully')
                        })
                              // Save the extracted information to a json file
                              fs.appendFileSync("./pdf2json/patients.json", JSON.stringify(data));
                              fs.appendFileSync("./pdf2json/words.json", JSON.stringify(words));
                      }
                  });
      
          //res.json({ message: "Hello from server!" });
          res.download(file);
            })
            .finally ( () => worker.terminate() );  
        });
     });

};


exports.pdf_details = function (req, res) {
    Pdfcv.findById(req.params.id, function (err, pdfcvs) {
        if (err) return next(err);
        res.send(pdfcvs);
    })
};