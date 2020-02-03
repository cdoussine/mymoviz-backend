var mongoose = require('./db')

var movieSchema  = mongoose.Schema({
  poster_path : String,
  overview : String,
  title: String,
  idMovieDB: Number,
});


var movieModel = mongoose.model('movies', movieSchema );

module.exports = movieModel;