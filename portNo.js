const data = require("./portNo.json");
const prompt = require('prompt');



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

    console.log(getPortNoFromCity(result.orig_city).portNo);
    console.log(getPortNoFromCity(result.Dest_city).portNo);
});