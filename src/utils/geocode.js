const request = require('request')

const geocode = (address, callback) => {
  
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWJieWFtb3VyIiwiYSI6ImNrNnpidzBudTE3MDEzbG1ncGF0cTlrZWgifQ.jsiIbuA9qBDLRH2dowg2Sw&`
  
  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback('unable to connect to location service')
    } else if (res.body.features.length === 0) {
      callback('unable to find location, try another search')
    } else {
      callback(undefined, {
        lat: res.body.features[0].center[1],
        long: res.body.features[0].center[0],
        location: res.body.features[0].place_name
      })
    }
  })

}


module.exports = geocode