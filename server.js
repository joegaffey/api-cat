var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.json()); 
app.use(express.static('public'));

var cats = [
  { name: 'apievangelist', url: 'http://apievangelist.com/apis.json'},
  { name: 'fitbit', url: 'http://www.fitbit.com/apis.json'},
  { name: 'trade', url: 'http://developer.trade.gov/apis.json'},
  { name: 'plivo', url: 'https://www.plivo.com/apis.json'},
  { name: 'enclout', url: 'http://enclout.com/api/apis.json'},
];

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/catalogs", function (request, response) {
  response.send(cats);
});

app.get("/apis/:id", function (request, response) {
  getAPIs(request.params.id);
  response.send(apis);
});

app.post("/apis", function (request, response) {
  console.log(request.method + ' ' + request.path);
  if(request.body)
    apis.apis.push(request.body);
  response.sendStatus(200);
});

function getAPIs(name) {
  var url = getURLByName(name);
  request(url, function (error, response, body) {
    apis = JSON.parse(body);    
  });
}
  
function getURLByName(name) {
  var url = null;
  for (let cat of cats) {
    if(cat.name === name) {
      url = cat.url;
      break;
    }
  }  
  return url;
}

var apis = [];
getAPIs(cats[0].name);

var listener = app.listen(process.env.PORT, function () {
  console.log('API Cat is listening on port ' + listener.address().port);
});
