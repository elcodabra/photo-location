_ = require('lodash');

module.exports = function() {
  var sessionSecrets = _.defaults({},
    //getConfigCommandLine(),
    getConfigEnvironment(),
    getConfigFile(),
    getConfigDefault()
  );

  if (!_.every(sessionSecrets)) {
    console.log("No session secret was configured")
  } else {
    console.log("Session secret is:", sessionSecrets)
  }

  return sessionSecrets;
}

/*
 function getConfigCommandLine() {
 var longOpts = {
 "sessionSecret": String
 }

 var shortOpts = {
 "s": ["--sessionSecret"]
 }

 var parsed = nopt(longOpts, shortOpts, process.argv, 2)
 return {sessionSecret: parsed.sessionSecret}
 }
 */
//-------------------------------------
function getConfigEnvironment() {
  return {
    instagram_client_id: process.env.instagram_client_id,
    foursquare_client_id: process.env.foursquare_client_id,
    foursquare_client_secret: process.env.foursquare_client_secret,
    google_api_key: process.env.google_api_key
  }
}

//-------------------------------------
function getConfigFile() {
  var config;

  try {
    config = require("../config.js");
  }
  catch (err) {
    config = {}
  }

  return {
    instagram_client_id: config.instagram_client_id,
    foursquare_client_id: config.foursquare_client_id,
    foursquare_client_secret: config.foursquare_client_secret,
    google_api_key: config.google_api_key
  };
}

//-------------------------------------
function getConfigDefault() {
  return {}
}



