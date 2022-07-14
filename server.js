const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser")
const mainRoutes = require('./routes/router');
const webpRouter = require('./routes/convert-to-webp');
const jpgToPngRouter = require('./routes/convert-to-png');
const convertTojpg = require('./routes/convert-to-jpg');
const convertTojpeg = require('./routes/convert-to-jpeg');
const convertToSvg = require('./routes/convert-to-svg');
const convertToTiff = require('./routes/convert-to-tiff');
const convertToGif = require('./routes/convert-to-gif');
const convertToAvif = require('./routes/convert-to-avif');
const port = process.env.PORT || 3000;

const staticPath=path.join(__dirname,"./public");
const tempPath=path.join(__dirname,"./templates/views");


app.set('view engine','ejs');
app.set('views',tempPath);
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(staticPath));

app.use(mainRoutes);
app.use(webpRouter);
app.use(jpgToPngRouter);
app.use(convertTojpg);
app.use(convertTojpeg);
app.use(convertToSvg);
app.use(convertToTiff);
app.use(convertToGif);
app.use(convertToAvif);
app.use((req,res)=>{
    res.status(404).render('404',{
        title:"404 page"
    })
});

app.listen(port,()=>{
console.log(`This app is running at http://localhost:${port}`)
});

