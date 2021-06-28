const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmFtYW4wNzAyIiwiYSI6ImNrcTdlNHVpeDA1NmEycG8yMTBtMDBrcHMifQ.reGaoy0BR_Rqn_vGLtzmVg'
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to access the requested url',undefined)
        } else if(body.features.length===0){
             callback('Unable to find location try another search',undefined)
        } else{
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            callback(undefined,{latitude: latitude,longitude: longitude,location : location})
        }
    })
}
