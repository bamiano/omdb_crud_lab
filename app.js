var express = require("express");
var request = require("request");
var bodyParser = require('body-parser'),
app = express();

var favorites = [];

app.use(bodyParser.urlencoded({extended:true}));

// root route or "Home page"
app.get('/', function(req, res){
  res.render('index.ejs');
});

// route to API to get movie titles list
app.get('/search', function(req, res){

  var searchTerm = req.query.movieTitle;
  var url = "http://www.omdbapi.com/?s=" + searchTerm;

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var obj = JSON.parse(body);
      res.render("results.ejs", {movieList: obj.Search});
    }
  });
});

// route to API using movie ID to get details
app.get('/details/:id', function(req, res){
  var movieID = req.params.id;
  // res.send(searchTerm);

  // build the URL that we are going to request
  var url = "http://www.omdbapi.com/?i=" + movieID;

  // call/make request to the OMDB API searching for the particular id
  request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
      console.log(body);
    var obj1 = JSON.parse(body);
    // res.send(obj.Search);
    res.render("details.ejs", {movieDetail: obj1});
    }
  });
});

app.get('/favorites', function(req, res){
  res.render("favorites.ejs", {favMovie: favorites});
});

app.post('/favorites', function(req, res){
  var favorite = {};
  favorite.title = req.body.title;
  favorites.push(favorite);
  console.log(favorites);
  res.redirect("/favorites");
});


app.listen(3000, function(){
  console.log("Server started on local host.");
});