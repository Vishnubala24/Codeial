const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');


app.use(express.static('./public'))
app.use(expressLayouts);
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(cookieParser());
// extract styles & scripts from sub layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// Use express router
app.use('/', require('./routes'))

app.set('view engine', 'ejs');
app.set('views', './views');



app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err} `);
        return;
    }
    console.log(`Server is up and running on port : ${port}`);
})