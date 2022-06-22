const express = require('express');
const app = express();
const path = require('path');
const mainRoutes = require('./routes/router');
const webpRouter = require('./routes/webpRouter');
const webpToPngRouter = require('./routes/webp-to-png');
const port = process.env.PORT || 3000;

const staticPath=path.join(__dirname,"./public");
const tempPath=path.join(__dirname,"./templates/views");


app.set('view engine','ejs');
app.set('views',tempPath);
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticPath));

app.use(mainRoutes);
app.use(webpRouter);
app.use(webpToPngRouter);


app.listen(port,()=>{
console.log(`This app is running at http://localhost:${port}`)
});

