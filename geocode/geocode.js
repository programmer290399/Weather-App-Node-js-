const request = require('request')


var geocodeaddress = (address,callback) => {
    request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=b0z1RCB8AQ6jRjipLBZHrKwXHTEJ9h9b&location=${address}`,
    json: true
}, (error, response, body) => {

    if (error) 
    {
        callback("Cannot connect to the web service ")
    }
     else if (body.info.statuscode === 400) 
     {
        callback("Insufficient info for location")
    } 
    else if (body.info.statuscode === 0) 
    {
        callback(undefined,{
            address : body.results[0].providedLocation.location,
            latitude : body.results[0].locations[0].latLng.lat ,
            Longitude : body.results[0].locations[0].latLng.lng
        })
       
    }
})}

module.exports ={ geocodeaddress}
