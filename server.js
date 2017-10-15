var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.json()); 
app.use(express.static('public'));


var url = 'http://apievangelist.com/apis.json';

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/apis", function (request, response) {
  response.send(apis);
});

app.post("/apis", function (request, response) {
  console.log(request.method + ' ' + request.path);
  if(request.body)
    apis.push(request.body);
  response.sendStatus(200);
});

var apis = [];
apis = request(url);

request(url, function (error, response, body) {
  apis = JSON.parse(body);
});

var listener = app.listen(process.env.PORT, function () {
  console.log('API Cat app is listening on port ' + listener.address().port);
});
