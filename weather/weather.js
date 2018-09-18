const request = require('request')

var getweather= (latitude,longitude,callback) =>{


request({
    url: `https://api.darksky.net/forecast/549a1bef03bd4a82674c421aa7bf7d5c/${latitude},${longitude}`,
    json: true
}, (error, response, body) => {
    if (!error && response.statusCode === 200) 
    {
        callback(`Actual temperature is : ${body.currently.temperature} , but it feels like it is : ${body.currently.apparentTemperature}`)
        
    } else 
    {
        callback("Unable to connect to the web server")
    }

})

}

module.exports = {getweather}