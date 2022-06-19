const router = require('express').Router();
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
  var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    },
    limits: { fileSize: maxSize }
  }).single('webp');

  
  
router.get('/',(req,res)=>{
    res.render('index',{title:"home page"});
    });
    
router.post('/convert-to-webp',(req,res)=>{
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

  const result = webp.cwebp(req.file.path,output_path,"-q 80");
  result.then((response) => {
  res.download(output_path);
});

}

    });

    

    });

    router.get('/convert-to-webp',(req,res)=>{
    res.render('convert-to-webp',{
        title:"Convert to WEBP"
    });
    });
    router.get('/progress',(req,res)=>{
    res.render('progress',{
        title:"Tool in progress.."
    });
    });
    

module.exports = router;
    