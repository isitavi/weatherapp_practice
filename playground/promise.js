

// import { resolve } from "url";

// var somePromise = new Promise((resolve,reject) =>{
    
//     setTimeout(() => {
//         // resolve('Hey data retive sucessful'); 
//         reject('Unable to full-fill promise');
//     }, 2500);
// });
// var asynADD = (a,b) => {
    //     return new Promise((resolve,reject) =>{
    //         setTimeout(() => {
    //             if(typeof a === 'number' && typeof b === 'number'){
    //                 resolve(a+b);
    //             }else{
    //                 reject('Something wrong');
    //             }
    //         }, 1500);
    //     })
    // };
    
    // asynADD(3,9).then((result) => {
    //     console.log('Result: ',result);
    //     return asynADD(result,3)
    // }).then((result) => {
    //     console.log('Result should be ',result);
    // }).catch((errorMsg) =>{
    //     console.log(errorMsg);
    // })
// somePromise.then((message) =>{
//     console.log('Sucess',message);
// },(errorMsg) => {
//     console.log('Reject',errorMsg);
// })





// var asynADD = (a,b) => {
//     return new Promise((resolve,reject) =>{
//         setTimeout(() => {
//             if(typeof a === 'number' && typeof b === 'number'){
//                 resolve(a+b);
//             }else{
//                 reject('Something wrong');
//             }
//         }, 1500);
//     })
// };

// asynADD(3,9).then((result) => {
//     console.log('Result: ',result);
//     return asynADD(result,3)
// }).then((result) => {
//     console.log('Result should be ',result);
// }).catch((errorMsg) =>{
//     console.log(errorMsg);
// })
const request = require('request');
const axios = require('axios');

var geocodeAddress = (address) => {

  return new Promise((resolve,reject) => {
    var urlencode = encodeURIComponent(address);
      request({
          url: `http://maps.googleapis.com/maps/api/geocode/json?address=${urlencode}`,
          JSON: true
      },(error,response,body) => {
        if(error){
            reject('Unable to connect with server');
            
        }
        else if(body.status === 'ZERO_RESULTS'){
            reject('Address is invalid');
            
        }
        else if(body.status === 'OK'){
            resolve({
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });

        }
      });
  });

};
    



geocodeAddress('Mohammadpur Townhall').then((result) => {
    console.log(JSON.stringify(result,undefined,2));
},(errorMSG) => {
    console.log('Error ',errorMSG);
});