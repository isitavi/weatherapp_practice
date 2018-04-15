var request = require('request');

var getweather = (lat,lon,callback) => {
    var ilat = encodeURIComponent(lat);
    var ilon = encodeURIComponent(lon);
    request({
        url: `https://api.darksky.net/forecast/31e565da941518a975624b3f40d9d054/${ilat},${ilon}`,
        json: true
    }, (error, response, body) =>{
        if(error){
            callback('Unable to connect to server');
           
        }
        else if(response.statusCode === 400){
            callback('Unable to fetch weather');
        }
        else if(response.statusCode === 200){
            callback(undefined,{
                tempature: body.currently.temperature,
                apparentTempature: body.currently.apparentTemperature
            });
        }
        
    } );
};


module.exports.getweather = getweather;