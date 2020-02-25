const request = require('request')


const forecast = (lat, long, callback) => {

  const url = `https://api.darksky.net/forecast/2284edef32cd1dcb1391a34fb24b1cec/${lat},${long}`

  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback('unable to connect to weather service')
    } else if (res.body.error) {
      callback('unable to find this location, try another search')
    } else {
      callback(undefined, 
        `${res.body.daily.data[0].summary} It is currently ${res.body.currently.temperature} degrees outside with a ${res.body.currently.precipProbability}% chance of rain.`
      )
    }
  })

}

module.exports = forecast