const apisListEl = document.querySelector('.apiList');
const titleEl = document.querySelector('.title');
const descriptionEl = document.querySelector('.description');
const catImgEl = document.querySelector('#catImg');
const catSelectEl = document.querySelector('#catSelect');
const docsFrameEl = document.querySelector('#docs');
const dialogEl = document.querySelector('#dialog');

const defaultIconUrl = 'https://cdn.glitch.com/a81e82dc-e9a4-4051-a0be-7e79d5716e3f%2FapiIcon.png?1508077598625';

fetch('catalogs').then(function(response) { 
  return response.json();
}).then(function(data) {
  data.forEach(function(data) {
    let optEl = document.createElement('option');
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
      let apiEl = document.createElement('li');
      apiEl.innerHTML = getApiPString(data);
      apisListEl.appendChild(apiEl);
    }); 
  });  
}

function getApiPString(data) {
  return `<img class="iconImg" src="${data.image ? `${data.image}` : defaultIconUrl}">
          <strong>${data.name}  ${data.version ? `(${data.version})` : ``}</strong>
          <p>${data.description}</p>
          <p>
          ${data.baseURL ? `<a href="javascript:window.open('${data.baseURL}');">URL</a> ` : ``}
          ${data.humanURL ? `<a href="javascript:window.open('${data.humanURL}');">Docs</a> ` : ``}
          </p>`;
}

function setDocsUrl(url) {
  try {
    docsFrameEl.src = url;
  }
  catch(e) {
    console.log(e);
    docsFrameEl.src = 'docs_error.html'
  }
}

function getSelectedAPI() {
  getAPIs(catSelectEl.options[catSelectEl.selectedIndex].value);
}

function exportAPIs() {
  window.open('/apis', '_blank'); 
}

function postAPI() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const body = JSON.stringify({
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
