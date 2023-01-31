const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akshat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Akshat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Akshat',
        message: 'This is a help message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address entered'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: 'Help',
        message: 'Help article not found',
        name: 'Akshat'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        message: 'Page not found',
        name: 'Akshat'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})