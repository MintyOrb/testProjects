var wdk = require('wikidata-sdk'),
	req	= require('request')

// var url = wdk.searchEntities('Physics');

// var search = 'Ingmar Bergman'
// var languages = 'fr' // will default to 'en'
// var limit = 10 // default 20
// var format = 'json' // default to json

// var url = wdk.searchEntities(search, languages, limit, format);

// this returns a query url that you are then free to request with the tool you like
var url = wdk.getEntities("Q413")

var request = require('request');
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body)
  }
})
