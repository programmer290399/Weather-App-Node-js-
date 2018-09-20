const yargs = require('yargs')
const axios = require('axios')


const argv = yargs
.options({
    a:{
        demand : true
        ,alias: 'address'
        ,describe:'Address to getch weather for'
        , string: true 
    }
})
.help()
.alias('help','h')
.argv

var encodedAddress = encodeURIComponent(argv.a)


var geocodeURL =   `http://www.mapquestapi.com/geocoding/v1/address?key=b0z1RCB8AQ6jRjipLBZHrKwXHTEJ9h9b&location=${encodedAddress}`

axios.get(geocodeURL).then((response)=>{
    if (response.data.info.statuscode === 400){
        throw new Error("Unable to Find that address")
    }
    
    var lat = response.data.results[0].locations[0].latLng.lat
    var lng = response.data.results[0].locations[0].latLng.lng
    var weatherURL = `https://api.darksky.net/forecast/549a1bef03bd4a82674c421aa7bf7d5c/${lat},${lng}`
    console.log(response.data.results[0].providedLocation.location)
    return axios.get(weatherURL)


}).then((response)=>{
    var temp = response.data.currently.temperature
    var apptemp = response.data.currently.apparentTemperature
    console.log(`Its currrently ${temp} , but it feels like ${apptemp}`)

}).catch((e)=> {
    if (e.code === 'ENOTFOUND'){
    console.log("Unable to connect to the API server")
    }else {
        console.log(e.message)
    }
})

