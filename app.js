const yargs = require('yargs');
const weather = require('./weather/getweather');
const geocode = require('./geocode/geocode'); 


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



geocode.geoaddr(argv.a, (errorMsg,result) =>{
    if(errorMsg){
        console.log(errorMsg);
    }
    else{
        console.log(result.address);
        weather.getweather(result.latitude,result.longitude,(errorMsg,weatherResult) =>{
            if(errorMsg){
                console.log(errorMsg);
            }
            else{
                console.log(`It's currently ${weatherResult.tempature}. It feels like ${weatherResult.apparentTempature}`);
            }
        }
        
        );
    }
} 
);







