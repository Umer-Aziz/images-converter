const convertToIco = require('express').Router();
const multer = require('multer');
const path = require('path');
const pngtoico = require("png-to-ico");
const Jimp = require("jimp");
const fs = require("fs");

const maxSize = 5 * 1024 * 1024 ;
  
const dir = "uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, {
      recursive: true
  });
}


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});


const pngtoicoFileFilter = function (req, file, callback) {
  var ext = path.extname(file.originalname);
  if (ext !== ".png") {
    return callback("This Extension is not supported");
  }
  callback(null, true);
};
  
    // upload file for webp to png 


    var upload = multer({
      storage: storage,
      fileFilter: pngtoicoFileFilter,
      limits: { fileSize: maxSize }
    }).single("file");
  
  // webp to png 

convertToIco.post("/uploadpngtoico", (req, res) => {
    upload(req, res, function (err) {
      if (err) {
        return res.end("Error uploading file.");
      }
      res.json({
        path: req.file.path,
      });
    });
  });
  

convertToIco.post("/pngtoico", (req, res) => {
      var size = parseInt(req.body.size)
      // console.log(size)
      outputFilePath = Date.now() + "output.ico";
      resizeImage = Date.now() + "resize.png";
      Jimp.read(req.body.path, function (err, test) {
        if (err) throw err;
        test.resize(size,size).quality(100).write(resizeImage);
    
        pngtoico([resizeImage])
          .then((buf) => {
            fs.writeFileSync(outputFilePath, buf);
            res.json({
              path: outputFilePath,
            });
          })
          .catch(console.error);
      });
    });

convertToIco.get('/download',(req,res) => {
      var pathoutput = req.query.path
      res.download(pathoutput,(err) =>{
          if(err){
              fs.unlinkSync(pathoutput)
              res.send(err)
          }
          fs.unlinkSync(pathoutput)
      })
    })
    

module.exports = convertToIco;