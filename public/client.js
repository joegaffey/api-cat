var apisListEl = document.querySelector('.apiList');
var titleEl = document.querySelector('.title');
var descriptionEl = document.querySelector('.description');
var catImgEl = document.querySelector('#catImg');
var catSelectEl = document.querySelector('#catSelect');


fetch('catalogs').then(function(response) { 
  return response.json();
}).then(function(data) {
  data.forEach(function(data) {
    var optEl = document.createElement('option');
    optEl.value = data.name;
    optEl.text = data.name;
    catSelectEl.add(optEl);
  });
  getAPIs(catSelectEl.options[0].value);
});

function getAPIs(catName) {
  fetch('apis/' + catName).then(function(response) { 
    return response.json();
  }).then(function(data) {
    titleEl.innerHTML = data.name;
    descriptionEl.innerHTML = data.description;
    if(data.image)
      catImgEl.src = data.image;
    apisListEl.innerHTML = '';
    data.apis.forEach(function(data) {
      var apiEl = document.createElement('li');
      apiEl.innerHTML = `<img class="iconImg" src="${data.image ? `${data.image}` : `https://cdn.glitch.com/a81e82dc-e9a4-4051-a0be-7e79d5716e3f%2FapiIcon.png?1508077598625`}">
                        <strong>${data.name}  ${data.version ? `(${data.version})` : ``}</strong>
                        <p>${data.description}</p>
                        <p>
                        ${data.baseURL ? `<a href="${data.baseURL}">URL</a> ` : ``}
                        ${data.humanURL ? `<a href="${data.humanURL}">Docs</a> ` : ``}
                        </p>`;
      apisListEl.appendChild(apiEl);
    }); 
  });  
}

function getSelectedAPI() {
  getAPIs(catSelectEl.options[catSelectEl.selectedIndex].value);
}

function exportAPIs() {
  window.open('/apis', '_blank'); 
}

function postAPI() {
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  var body = JSON.stringify({
    name: document.getElementById('formName').value,
    description: document.getElementById('formDescription').value,
    baseURL: document.getElementById('formUrl').value,
    humanURL: document.getElementById('formHumanUrl').value,
    version: document.getElementById('formVersion').value,
  });
  fetch('apis', {
    method: "POST",
    headers: headers,
    body: body
  });  
}
