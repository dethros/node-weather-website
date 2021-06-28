const request = require("request");

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=8b0fa9f639e5b9e577cda17518783076&query='+longitude+','+latitude
    request({url:url,json:true},(error,{body})=>{
        if (error){
            callback('Error: Request for weather info failed',undefined)
        } else if(body.error){
            callback('Error:'+url)
        } else{
            callback(undefined,'It is '+body.current.weather_descriptions[0]+' in '+body.location.name+" with temerature of "+ body.current.temperature)
        }
    })
}

module.exports = forecast