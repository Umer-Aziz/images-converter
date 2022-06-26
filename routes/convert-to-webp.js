const webpRouter = require('express').Router();
const multer = require('multer');
const sharp = require("sharp");
const path = require('path');

    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
          callback(null, "uploads/");
        },
        filename: function (req, file, callback) {
          callback(null, file.fieldname + "_" + Date.now() + "_"  +path.extname(file.originalname));
        },
      });
    
      const maxSize = 5 * 1024 * 1024 ;
    
    
    // upload for webp converter 
      var upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
          if ( file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png" 
        || file.mimetype == "image/gif" || file.mimetype == "image/avif" || file.mimetype == "image/svg+xml" || file.mimetype == "image/tiff") {
          cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg .jpeg , tiff ,svg,gif, and avif format allowed!'));
          }
        },
        limits: { fileSize: maxSize }
      }).single('webp');

      // Converter for webp 

    webpRouter.post('/convert-to-webp',(req,res)=>{
  
    upload(req,res,err =>{

       if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.send(err)
      } else if (err) {
        // An unknown error occurred when uploading.
        res.send(err)
      }
      else {
  //    console.log(req.file.path);
  let output_path = Date.now() + "-" + "output.webp";
  sharp(req.file.path)
  .toFile(output_path) 
  .then( data => {res.download(output_path); })
  .catch( err => { console.log(err)});

}

    });
    });

module.exports =webpRouter;