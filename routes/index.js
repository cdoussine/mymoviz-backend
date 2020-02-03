var express = require('express');
var router = express.Router();
let request = require('async-request');
var mongoose = require('mongoose');
var movieModel = require('../models/movies');

// HERE YOU NEED TO PUT YOU API KEY
var myApiKey = '8f588cc04fc887a56a35271ae73d0679';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get movies
router.get('/movies', async function(req, res, next) {
  // We use async await request to access movies data from the API
  var data = await request(`https://api.themoviedb.org/3/discover/movie?api_key=${myApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1
  `);

  // We need to parse the body to be able to access the data with the format json
  body = JSON.parse(data.body);

  res.json({ result: true, body });
});
// Get mymovies
router.get('/mymovies', function(req, res, next) {
  // We ask the database to give us all the collection
  movieModel.find(function(error, movies) {
    if (error) {
      console.log('Oups...error ->', error);
    } else {
      console.log('Here is our movie list', movies);
      res.json({ result: true, data: movies });
    }
  });
});

// Post route
router.post('/mymovies', function(req, res, next) {
  // 1) We create à newMovie with our movieModel
  var newMovie = new movieModel({
    poster_path: req.body.poster_path,
    overview: req.body.overview,
    title: req.body.title,
    idMovieDB: req.body.idMovieDB
  });
  //  2) We save our newMovie in our database
  newMovie.save(function(error, movie) {
    if (error) {
      console.log('Oups...error ->', error);
    } else {
      console.log('Here is our new Liked movie ->', movie);

      res.json({ result: true, movie });
    }
  });
});

// Delete route
router.delete('/mymovies/:movieId', function(req, res, next) {
  // We will delete in our databse the movie
  movieModel.deleteOne({ idMovieDB: req.params.movieId }, function(
    error,
    movie
  ) {
    if (error) {
      console.log('Oups...error ->', error);
    } else {
      console.log('Here is our deleted movie ->', movie);

      res.json({ result: true, movie });
    }
  });
});

module.exports = router;
