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


var port = process.env.PORT || 5000;

//Sets the default path the be the public folder.
app.use(express.static(path.join(__dirname, '/public')));


request('https://opensky-network.org/api/states/all', function (error, response, body) {

  var json = JSON.parse(body);

  //console.log(json);


  fs.writeFile('public/data/airplane.json', JSON.stringify(json, null, 4), function(err){

    if (err) {
      console.log(err);
    }
    console.log('File written');

  });


});


app.get('/zip', function(req, res) {

  console.log(req.body.params);


  console.log('in zip');
  request('https://www.zipcodeapi.com/rest/t6iMOqBUYrkSGbuFwSegmdNy5LgjER18XjUMKwHIY2BEd5kJYzZlNNTSyacd1dmZ/info.json/98133/degrees', function (error, response, body) {

    var json = JSON.parse(body);


    fs.writeFile('public/data/zipInfo.json', JSON.stringify(json, null, 4), function(err) {

      if (err) {
        console.log(err);
      }
      console.log('Zip written');

    });


  });

});





server.listen(port, function(){
  console.log('Server on port:' + port);
});

