require('dotenv').config();

// import API keys into variable

var keys = require("./keys.js");

// var spotify = new spotify(keys.spotify);
// Was running into a problem - terminal says 'spotify is not a constructor'

var axios = require("axios");


// receive command from command line

var command = process.argv[2];



// search for concerts
if (command == 'concert-this'){
    console.log('Concert Search');
    var concertArgs = process.argv;
    var concert = "";
    for (var i=2; i < concertArgs.length; i++){
        if (i > 2 && i < concertArgs.length) {
            concert = concert + "+" + concertArgs[i];
          } else {
            concert += concertArgs[i];
    }
console.log(concert);
var concertQuery = "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp";
axios.get(concertQuery).then(
    function(response) {
      console.log("Bands Response: " + response.data);
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
// play a song in spotify

// search a movie

// DO SOMETHING!
