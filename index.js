const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./public'))
app.use(expressLayouts);

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