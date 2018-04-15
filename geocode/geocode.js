const request = require('request');

var geocodeaddress= (address,callback) => {

    var urlencode = encodeURIComponent(address);
    
    request({
    
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${urlencode}`,
        json: true
    },(error, response, body) => {
        if(error){
            callback('Unable to connect with server');
            
        }
        else if(body.status === 'ZERO_RESULTS'){
            callback('Address is invalid');
            
        }
        else if (body.status === 'OK'){
            callback(undefined,{
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });

        }
        
    });
};


module.exports.geoaddr = geocodeaddress;


//31e565da941518a975624b3f40d9d054
