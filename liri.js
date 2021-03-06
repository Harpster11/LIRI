require('dotenv').config();

var fs = require('fs');

// import API keys into variable

var keys = require("./keys.js");


// require Axios command line module

var axios = require("axios");



// receive command from command line

var command = process.argv[2];

// search for a song in Spotify

if (command == 'spotify-this-song'){
  console.log('Spotify Search');
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);
  var songArgs = process.argv;
  var song = "";
  for (var k=3; k < songArgs.length; k++){
    if ( k>3 && k < songArgs.length) {
      song = song + songArgs[k];
      spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        console.log(data.tracks.items[0].name); 
        console.log(data.tracks.items[0].artists[0].name);
        console.log(data.tracks.items[0].external_urls.spotify);
      });
    } else if (songArgs.length>2) {
        song += songArgs[k];
        spotify.search({ type: 'track', query: song }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
         
          console.log(data.tracks.items[0].name); 
          console.log(data.tracks.items[0].artists[0].name);
          console.log(data.tracks.items[0].external_urls.spotify); 
        });
    } else {
      song = "The Sign Ace of Base";
      spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data.tracks.items[0].name); 
      console.log(data.tracks.items[0].artists[0].name);
      console.log(data.tracks.items[0].external_urls.spotify);

      });
    }
    console.log(song);
  }
 
  
}

// search for concerts
if (command == 'concert-this'){
    console.log('Concert Search');
    var concertArgs = process.argv;
    var concert = "";
    for (var i=3; i < concertArgs.length; i++){
        if (i > 3 && i < concertArgs.length) {
            concert = concert + "+" + concertArgs[i];
          } else {
            concert += concertArgs[i];
    }
console.log(concert);
var concertQuery = "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp";
axios.get(concertQuery).then(
    function(response) {
      console.log("Artist Search:",concert);
      console.log(response.data);
      for (i=0; i<10; i++){
          console.log("Concert Date:",response.data[i].datetime);
          console.log("City:",response.data[i].venue.city);
          console.log("Venue",response.data[i].venue.name);
          console.log("---------------------------------");
      }
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}
}

// search a movie
if (command == "movie-this"){
    var movieArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < movieArgs.length; i++) {

  if (i > 3 && i < movieArgs.length) {
    movieName = movieName + "+" + movieArgs[i];
  } else {
    movieName += movieArgs[i];

  }
}

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbrating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Cast: " + response.data.Actors);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

}

// DO SOMETHING!
