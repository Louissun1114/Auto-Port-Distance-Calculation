var axios = require('axios');
const fs = require('fs');
const path = require('path');

// fs.readFile(path.join('portNo.json'),'utf8',(err,data) => {
//   if(err) {
//     console.log(err)
//     return
//   }
//   console.log(data);
// })

const params = new URLSearchParams({
    a: 1679,
    b: 857,
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
