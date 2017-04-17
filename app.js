var request = require('request');
var express = require('express');
var parser = require('body-parser');
var path = require('path');
var fs = require('fs');



// Use app to use body parser for JSON.
var app = express();
var server = require('http').createServer(app);
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


var port = 5000;


//Sets the default path the be the public folder.
app.use(express.static(path.join(__dirname, '/public')));


request('https://opensky-network.org/api/states/all', function (error, response, body) {
  //console.log('error:', error); // Print the error if one occurred
  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.

  var json = JSON.parse(body);

  console.log(json);


  fs.writeFile('airplane.json', JSON.stringify(json, null, 4), function(err){

    console.log('File written');

  });



});


server.listen(port, function(){
  console.log('Server on port:' + port);
});
