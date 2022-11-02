var axios = require('axios');
//const data = require("./data.json");
var mysql = require('mysql');
const fs = require('fs');

async function getPortResult(q) {
    const params = new URLSearchParams({
        q,
      }).toString();
    
    var config = {
      method: 'get',
      url: 'http://ports.com/aj/findport/?' + params,
      headers: { 
        'Accept': '*/*', 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'X-Requested-With': 'XMLHttpRequest', 
      }
    };
    
    const response = await axios(config);
    const result = response.data.split("\n").map(x=>x.split("|")).map(x=>({portName: x[0], portNo: x[1]}));
    if (result.length > 0) return result[0]
    else return false;
}

async function main() {
    

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Swy20001114@",
        database: 'mydb'
    });
    
    con.connect(async function(err) {
        if (err) throw err;
        con.query("SELECT * FROM port_distance", async function (error, result, fields) {
          if (error) throw error;
          //console.log(result.map(x=>x.city));
          let cities = result.map(x=> {
            return {
                locode: x.pol,
                portName: x.city
            }
          });

          // limit to first 2 results
          //cities = [cities[0], cities[1]];
          // read from sql table and make cities variable

          const data = [];
      
          for await (const cityObj of cities) {
              console.log(cityObj);
              const result = await getPortResult(cityObj.portName);
              result.city = cityObj.portName;
              result.locode = cityObj.locode;
              console.log(JSON.stringify(result));
              data.push(result);

              var jsonObj = JSON.stringify(data);
              console.log(jsonObj);
   
             fs.writeFile('portNo.json',jsonObj,(err)=>{
               if(err){
                   throw err;
               }
               console.log("JSON data is saved.");
            });

          }

        });
        con.end();
      });

}


main();