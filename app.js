
var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var app = express();

//Loads rute files
var anime_routes= require('./Routes/animes');

//middlewares
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
//CORS

//Rutes

//ADD ROUTE ARRYS HERE
app.use('/api',[anime_routes])

//Exports

module.exports = app;
