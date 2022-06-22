const webpToPngRouter = require('express').Router();
const multer = require('multer');
const webp=require('webp-converter');
webp.grant_permission();


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "uploads/");
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_"  + file.originalname);
    },
  });
  
  const maxSize = 5 * 1024 * 1024 ;
  
  
  
    // upload file for webp to png 
    var uploadWebp = multer({
      storage: storage,
      fileFilter: (req, file, cb) => {
        if ( file.mimetype == "image/webp") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only webp format allowed!'));
        }
      },
      limits: { fileSize: maxSize }
    }).single('webptopng');
  
  // webp to png 

webpToPngRouter.post('/webp-to-png',(req,res)=>{
    uploadWebp(req,res,err =>{
  
       if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.send(err)
      } else if (err) {
        // An unknown error occurred when uploading.
        res.send(err)
      }
      else {
  //    console.log(req.file.path);
  let output_path = Date.now() + "-" + "output.png";
  
  const result =webp.dwebp(req.file.path,output_path, "-o");
  result.then((response) => {
  res.download(output_path);
  });
  
  }
    }); 
  
    });

module.exports = webpToPngRouter;
    