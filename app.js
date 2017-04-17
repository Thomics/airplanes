var request = require('request');
var express = require('express');
var parser = require('body-parser');
var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');




// Use app to use body parser for JSON.
var app = express();
var server = require('http').createServer(app);
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


var port = 5000;


//Sets the default path the be the public folder.
app.use(express.static(path.join(__dirname, '/public')));


request('https://opensky-network.org/api/states/all', function (error, response, body) {

  var json = JSON.parse(body);

  //console.log(json);


  fs.writeFile('public/airplane.json', JSON.stringify(json, null, 4), function(err){

    console.log('File written');

  });


});



app.get('/', function(request, response) {
  console.log(request.params.msg);

  request('http://flightaware.com/live/flight/VRD752', function(error, response, body) {
    console.log(body);
  });
});


server.listen(port, function(){
  console.log('Server on port:' + port);
});
