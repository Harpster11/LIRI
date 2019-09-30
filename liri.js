require('dotenv').config();

// import API keys into variable

var keys = require("./keys.js");

var spotify = new spotify(keys.spotify);
