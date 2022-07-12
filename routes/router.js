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

router.get('/convert-to-svg',(req,res)=>{
            res.render('convert-to-svg',{
                title:"Convert to SVG"
            });
            });

router.get('/convert-to-tiff',(req,res)=>{
            res.render('convert-to-tiff',{
                title:"Convert to TIFF"
            });
            });

router.get('/convert-to-gif',(req,res)=>{
            res.render('convert-to-gif',{
                title:"Convert to GIF"
            });
            });

router.get('/convert-to-avif',(req,res)=>{
            res.render('convert-to-avif',{
                title:"Convert to AVIF"
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
   

module.exports = router;
    