var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
movieName: String,
movieImage: String,
});

var movieModel = mongoose.model('movies', movieSchema);

module.exports = movieModel;