const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=a3ac02668da2588a2b3b0e5fc0ca2bfc&query=" + latitude + "," + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
                location: body.location.name,
                forecast: body.current.weather_descriptions[0],
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast
