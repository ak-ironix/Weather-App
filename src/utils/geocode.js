const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=2fdedd448219fa42f29a38131beade5a&query=' + address
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.data && body.data.length === 0) {
            callback("Invalid query")
        } else if (body.error) {
            callback(body.error.context.query.message, undefined)
        }
        else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geocode