const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/codial_developement");

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error while connecting Mongo DB'));

db.once('open', function(){
    console.log('Successfully connected');
});

module.exports = db;