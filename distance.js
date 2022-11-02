var axios = require('axios');

const params = new URLSearchParams({
    a: 287,
    b: 12,
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
