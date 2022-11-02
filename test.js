const prompt = require('prompt');

// start the prompt
prompt.start();

// ask user for the input
prompt.get(['orig_city', 'dest_city'], (err, result) => {
    if (err) {
        throw err;
    }

    // print user details
    console.log(`${result.name} is from ${result.country}`);

});


