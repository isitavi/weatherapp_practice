const yargs = require('yargs');
const axios = require('axios');



const argv = yargs
.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Prodive address to know weather',
        string: true
    }
})
.help()
.alias('help','h')
.argv

var urlencode = encodeURIComponent(argv.address);
var geoURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${urlencode}`;





axios.get(geoURL).then((response) =>{
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find address');
        
    }
    
    var ilat = response.data.results[0].geometry.location.lat;
    var ilon = response.data.results[0].geometry.location.ilon;
    var weatherURL =`https://api.darksky.net/forecast/31e565da941518a975624b3f40d9d054/${ilat},${ilon}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then((response) => {
    var tempature = response.data.body.currently.temperature;
    var apparentTempature = response.data.body.currently.apparentTemperature;
    console.log(`It's currently ${tempature} and It feels like ${apparentTempature}`);
}).catch((e) =>{
    
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers');
    }else{
        console.log(e.message);
    }
})








