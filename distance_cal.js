const data = require("./portNo.json");
const prompt = require('prompt');
var axios = require('axios');
const fs = require('fs');
const path = require('path');

// start the prompt
prompt.start();

// ask user for the input
prompt.get(['orig_city','Dest_city'], (err, result) => {
    if (err) {
        throw err;
    }

    function getPortNoFromCity(locode_inp) {
        return data.find(function (x){
            if (x.locode === locode_inp) {
                return true;
            } else {
                return false;
            }
        })
    }

fs.readFile(path.join('portNo.json'),'utf8',(err,data) => {
  if(err) {
    console.log(err)
    return
  }
  console.log(data);
})

const params = new URLSearchParams({
    a: getPortNoFromCity(result.orig_city).portNo,
    b: getPortNoFromCity(result.Dest_city).portNo,
  }).toString();

var config = {
  method: 'get',
  url: 'http://ports.com/aj/sea-route/?' + params,
  headers: { 
    'Accept': 'application/json, text/javascript, */*', 
    'X-Requested-With': 'XMLHttpRequest'
  }
};

axios(config)
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});

    //console.log(getPortNoFromCity(result.orig_city).portNo);
    //console.log(getPortNoFromCity(result.Dest_city).portNo);
});