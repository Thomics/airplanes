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


app.get('/home', function(req, res) {

  request('https://opensky-network.org/api/states/all', function (error, response, body) {

    var json = JSON.parse(body);

    return res.json(json);

  });

});


app.get('/zip', function(req, res) {

  var zip = req.query.zip || 98133;

  var url = 'https://www.zipcodeapi.com/rest/UaYRNQn2XahZfTEnzulneqX6P3fl4xsYHrQvidxfoPfDJT1iomFDNCJCGYYLvrJd/info.json/' + zip + '/degrees';


  request(url, function (error, response, body) {

    var json = JSON.parse(body);

    return res.json(json);

  });

});

app.get('/planeData', function(req, res) {

  var callsign = req.query.callsigns || 'VIR10K';

  var url = 'https://planefinder.net/data/flight/' + callsign;

  request(url, function(error, response, body) {

    var $ = cheerio.load(body);

    var planeData = {
      planeArr: []
    };


    $('.table-responsive tr').each(function(i, elem) {

      var text = $(this).text();

      text = text.replace(/\r?\n|\r/g, " ");

      planeData.planeArr.push(text);
    });

    res.send(planeData);


  });


});



server.listen(port, function(){
  console.log('Server on port:' + port);
});

