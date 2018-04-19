const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); 
app.use(express.static('public'));

let apis = [];

const cats = [
  { name: 'apievangelist', url: 'http://apievangelist.com/apis.json'},
  { name: 'fitbit', url: 'http://www.fitbit.com/apis.json'},
  { name: 'trade', url: 'http://developer.trade.gov/apis.json'},
  { name: 'plivo', url: 'https://www.plivo.com/apis.json'},
  { name: 'enclout', url: 'http://enclout.com/api/apis.json'},
  { name: 'acuityscheduling', url: 'https://acuityscheduling.com/apis.json'},
  { name: 'supermonitoring', url: 'https://www.supermonitoring.com/apis.json'},
  { name: 'checkmarket', url: 'https://api.checkmarket.com/3/apis.json'},
  { name: 'onemusicapi', url: 'http://www.onemusicapi.com/apis.json'},
];

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/catalogs", function (request, response) {
  response.send(cats);
});

app.get("/apis/:id", function (request, response) {
  let url = cats.filter(cat => cat.name === request.params.id)[0].url;
  getAPIs(url, response);  
});

app.get("/apis", function (request, response) {
  response.send(apis);
});

app.post("/apis", function (request, response) {
  console.log(request.method + ' ' + request.path);
  if(request.body) {
    apis.apis.push(request.body);
    response.sendStatus(200);
  }
  else 
    response.sendStatus(422);
});


function getAPIs(url, clientResponse) {  
  request(url, (error, response, body) => {
    apis = JSON.parse(body);    
    clientResponse.send(apis);
  });
}

const listener = app.listen(process.env.PORT, function () {
  console.log('API Cat is listening on port ' + listener.address().port);
});