var apisListEl = document.querySelector('.apiList');
var titleEl = document.querySelector('.title');
var descriptionEl = document.querySelector('.description');

fetch('apis').then(function(response) { 
  return response.json();
}).then(function(data) {
  console.log(data);
  titleEl.innerHTML = data.name;
  descriptionEl.innerHTML = data.description;
  data.apis.forEach(function(data) {
    var apiEl = document.createElement('li');
    apiEl.innerHTML = `<strong>${data.name}   ${data.version ? `(${data.version})` : ``}</strong><br/>
                      ${data.description}<br/>
                      <a href="${data.baseURL}">Spec</a><br/><br/>`;
    apisListEl.appendChild(apiEl);
  }); 
});   

var apisSubmitEl = document.querySelector('#submitAPI');

apisSubmitEl.onclick = function() {
  postAPI();
};

function postAPI() {
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  var body = JSON.stringify({
    name: document.getElementById('formName').value,
    description: document.getElementById('formDescription').value,
    baseUrl: document.getElementById('formUrl').value,
    version: document.getElementById('formVersion').value,
  });
  fetch('apis', {
    method: "POST",
    headers: headers,
    body: body
  });  
}
