const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-statergy');
const MongoStore = require('connect-mongo')(session);
// const sassMiddleware = require('node-sass-middleware');


// app.use(sassMiddleware({
//     src: '/public/scss',
//     target: '/public/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));


app.use(express.static('./public'))
app.use(expressLayouts);
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(cookieParser());
// extract styles & scripts from sub layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in DB

app.use(session({
    name: 'codeial',
    // TODO change the secrect before prod deployment
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
            mongooseConnection: db,
            autoRemove: 'disable'
        },
        function(err){
            console.log(err || 'Setup is done');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Use express router
app.use('/', require('./routes'))


app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err} `);
        return;
    }
    console.log(`Server is up and running on port : ${port}`);
})