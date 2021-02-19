//LIBS AND UTILITIES
const express = require('express')
const Router = express.Router();
const AnimeController = require('../Controllers/animeController');

//METHODS

//GET
Router.get('/generes',AnimeController.GetGeneres);
Router.get('/top',AnimeController.GetTop);
Router.get('/Random5/:idgenere?',AnimeController.GetRecomendations);
Router.get('/animes/:id',AnimeController.GetAnimeByID);


//POST
//PATCH
//DELETE

module.exports=Router