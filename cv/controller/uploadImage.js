const ImageSchema = require("../model/fileUpload");


const {TesseractWorker} = require('tesseract.js');
const worker = new TesseractWorker();
const express = require("express");
const app  = express();
const bodyParser = require('body-parser');
let fs = require('fs'),
PDFParser = require("pdf2json");
const email = require('node-email-extractor').default;
var uwords = require('uwords');

var datapdf ;

module.exports.UploadImage = async (req, res) => {

            worker
            .recognize(req.file.path, "eng" , { tessjs_create_pdf : '1' },{tessedit_pageseg_mode: '1' } )
            .progress(progress => {
                console.log(progress);
            })
            .then(result => {
              const file = `./tesseract.js-ocr-result.pdf`;
              // Set up the pdf parser
              let pdfParser = new PDFParser(this, 1);
              pdfParser.loadPDF(file);
              // On data ready
               pdfParser.on("pdfParser_dataReady", async (pdfData) => {
                      // The raw PDF data in text form
                      const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
                      if(raw !== null) {
                          data = email.text(raw);
                          console.log(data);
                          console.log(data["emails"][0]);
                          var words = uwords(raw);
                          console.log(words);

                          const keywordArr = ['CSS','php', 'french','javascript','Node','React','PhD','English'];
                           
                          const message = words;
                          let descCV = keywordArr.reduce((r,v) => message.toString().toLowerCase().includes(v.toLowerCase()) && v || r, '')

                          console.log(descCV);
                              // Save the extracted information to a json file
                              //fs.appendFileSync("../training/cv.json", JSON.stringify(data));
                              //fs.appendFileSync("../training/words.json", JSON.stringify(words));
                              console.log('done saving');

  const imageUploaded = new ImageSchema({
    image: req.file.path,
    email : data["emails"][0],
    desc : descCV,
  });

  try {
    await imageUploaded.save();

  } catch (error) {

  }
                           
                      }
                  });
            
            })
            .finally ( () => worker.terminate() );  
       



  res.sendStatus(200); 
};


module.exports.downloadImage = async (req, res) => {
  const file = `./tesseract.js-ocr-result.pdf`;
  console.log("i am here to download ");
  //res.json({ message: "Hello from server!" });
  res.download(file);

}

module.exports.pdf_Alldetails = async (req, res) =>{
  ImageSchema.find(function (err, imageuploads) {
      if (err) return next(err);
      res.send(imageuploads);
  })
};


module.exports.pdf_delete = async (req, res , next) => {
  ImageSchema.findByIdAndRemove(req.params.id, function (err) {
      if (err) return next(err);
      res.send('Deleted successfully!');
  })
};