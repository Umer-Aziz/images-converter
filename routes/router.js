const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('index',{title:"Image Converter"});
    });
    

router.get('/convert-to-webp',(req,res)=>{
    res.render('convert-to-webp',{
        title:"Convert to WEBP"
    });
    });


router.get('/convert-to-png',(req,res)=>{
    res.render('convert-to-png',{
        title:"Convert to PNG"
    });
    });

    
router.get('/convert-to-jpg',(req,res)=>{
    res.render('convert-to-jpg',{
        title:"Convert to JPG"
    });
    });

router.get('/convert-to-jpeg',(req,res)=>{
        res.render('convert-to-jpeg',{
            title:"Convert to JPEG"
        });
        });


router.get('/contact',(req,res)=>{
    res.render('contact',{
        title:"Contact Us"
    });
    });

router.get('/about',(req,res)=>{
      res.render('about',{
          title:"About us"
      });
      });

router.get('/privacy-policy',(req,res)=>{
      res.render('privacy-policy',{
          title:"Privacy Policy"
      });
      });

router.get('/progress',(req,res)=>{
    res.render('progress',{
        title:"Tool in progress.."
    });
    });
    

module.exports = router;
    