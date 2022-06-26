const convertTojpeg = require('express').Router();
const multer = require('multer');
const path = require('path');
const sharp = require("sharp");
const fs = require("fs");

const dir = 'public/uploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
        recursive: true
    });
}


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "public/uploads");
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_"  + path.extname(file.originalname));
    },
  });
  
  const maxSize = 5 * 1024 * 1024 ;
  
  
  
    // upload file for webp to png 
    var upload = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        if ( file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/webp" 
        || file.mimetype == "image/gif" || file.mimetype == "image/avif" || file.mimetype == "image/svg+xml" || file.mimetype == "image/tiff") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .webp .jpg .jpeg , tiff ,svg,gif, and avif format allowed!'));
        }
      },
      limits: { fileSize: maxSize }
    }).single('jpeg');
  
  // webp to png 

convertTojpeg.post('/convert-to-jpeg',(req,res)=>{
    upload(req,res,err =>{
  
       if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.send(err)
      } else if (err) {
        // An unknown error occurred when uploading.
        res.send(err)
      }
      else {
    //  console.log(req.file.path);
  let output_path = Date.now() + "-" + "output.jpeg";
  sharp(req.file.path)
  .toFile(output_path) 
  .then( data => {res.download(output_path,(err)=>{
    if (err) throw err;
    // console.log(req.file)
    if (req.file) {
      fs.unlinkSync(req.file.path);
      fs.unlinkSync(output_path);
    }
  });
 })
  .catch( err => { console.log(err)});
  }
    }); 
  
    });

module.exports = convertTojpeg;
    