var express = require('express');
var router = express.Router();

var request = require('sync-request');


var movieModel = require('../models/movie');


var result = request("GET", "https://api.themoviedb.org/3/movie/popular?api_key=a08b1658f571630825cad232d5f9229d&language=en-US&page=1");
var content = JSON.parse(result.body);



/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express' });
});

router.get('/new-movies', function(req, res, next) {

  res.json(content);
});

router.post('/wishlist-movies', async function(req, res, next) {
// content.results.orignal_title.push(req.body.title)

var newMovie = await new movieModel({
  movieName: req.body.movieName,
  movieImage: req.body.movieImage,
})

await newMovie.save();

  res.json({result: true});
});


router.delete('/wishlist-movies/:name', async function(req, res, next) {
  // content.results.orignal_title.push(req.body.title)
  
  await movieModel.deleteOne(   

    {movieName: req.params.name}
    
    );
  
    res.json({result: true});
  });



  router.get('/wishlist-movies', async function(req, res, next) {

    var movieList = await movieModel.find();
console.log("YOOOO", movieList)

    res.json({ movieList });
  });
  

module.exports = router;
