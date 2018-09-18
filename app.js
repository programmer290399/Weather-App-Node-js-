
const geocode = require('./geocode/geocode.js')
const yargs = require('yargs')
const weather = require('./weather/weather.js')
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


 
geocode.geocodeaddress(encodeURIComponent(argv.a),(errorMessage,results)=>{

    if(errorMessage){
        console.log(errorMessage)

    }else 
    {
        console.log(`Showing Results for : ${results.address}`)
        weather.getweather(results.latitude , results.Longitude, (errorMessage,finalResults)=>{
        if (errorMessage)
        {
            console.log(errorMessage)

        }
        else 
        {
            
            console.log(JSON.stringify(finalResults))
        }


       })
    }

})


