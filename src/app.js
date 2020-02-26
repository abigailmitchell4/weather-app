const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))


//paths
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App'
  })
})

// app.get('/help', (req, res) => {
//   res.send('help page')
// })

// app.get('/about', (req, res) => {
//   res.send('about page')
// })

app.get('/weather', (req, res) => {
  // res.render('weather', {
  //   title: 'Weather page'
  // })

  if(!req.query.address) {
    return res.send({
      error: 'Please provide an address.'
    })
  }

  geocode(req.query.address, (err, { lat, long, location } = {}) => {
    if(err) {
      return res.send({ err })
    }

    forecast(lat, long, (err, forecastData) => {
      if(err) {
        return res.send({ err })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  }) 
})

// app.get('/*', (req, res) => {
//   res.render('error404', {
//     title: '404',
//     message: `Sorry, can't find weather page.`
//   })
// })


app.get('*', (req, res) => {
  res.render('error404', {
    title: 'Error 404',
    message: `Sorry, page does not exist.`
  })
})



app.listen(port, () => {
  console.log('server has started')
})
