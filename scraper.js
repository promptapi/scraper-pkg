const axios = require('axios');
const fs = require('fs');
const path = require('path');

const validParams = [
    'auth_password',
    'auth_username',
    'cookie',
    'country',
    'referer',
    'selector',
]

function scraper(url, params, timeout=5000){
  try {
    let vURL = new URL(url)
  } catch(e) {
    throw new Error(e.message)
  }
  
  let apiKey = process.env.PROMPTAPI_TOKEN
  if (!apiKey) {
    throw new Error('You need to set PROMPTAPI_TOKEN environment variable')
  }

  let needParams = {url: url}
  Object.keys(params).forEach(paramName => {
    if (validParams.indexOf(paramName) > -1){
      needParams[paramName] = params[paramName]
    }
  })

  let promptAPIEndPoint = 'https://api.promptapi.com/scraper'

  let config = {
    method: 'get',
    url: promptAPIEndPoint,
    params: needParams,
    headers: {
      'apikey': apiKey,
    },
    timeout: timeout,
  };
  return axios(config).then(response => {
    if (response.data['data-selector']){
      response.data.data = response.data['data-selector']
    }
    return response.data
  })
  .catch(error => {
    if (error.response) {
      return {error: error.response.data.message}
    } else {
      return {error: error.message}
    }
  });
}

function save(filename, data){
  let fileDirname = path.dirname(filename)
  let fileExt = path.extname(filename)
  let fileBasename = path.basename(filename, fileExt)
  let targetExt = '.html'
  
  saveData = data
  if (typeof(data) === 'object'){
    targetExt = '.json'
    saveData = JSON.stringify(data)
  }
  
  fileSavename = `${fileDirname}/${fileBasename}${targetExt}`
  
  fs.writeFile(fileSavename, saveData, (err) => {
    if (err) throw err;
    let stats = fs.statSync(fileSavename)
    console.log(`${fileSavename} saved successfully, written ${stats["size"]} bytes`);
  });
}

module.exports = {
  scraper,
  save,
}
