const hbs = require('hbs')
const path = require('path')
const express = require('express')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const viewspath = path.join(__dirname,'../Templates/views')
const partialspath = path.join(__dirname,'../Templates/partials')
app.set('view engine','hbs')
app.set('views',viewspath)

app.use(express.static(path.join(__dirname,'../public')))
hbs.registerPartials(partialspath)

app.get('', (req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Yehia El sayed'
    })
})
app.get('/help', (req,res) => {
    res.render('help',{
        title : 'Weather App',
        name : 'Yehia El sayed'
    })
})
app.get('/about', (req,res) => {
    res.render('about',{
        title : 'Weather App',
        name : 'Yehia El sayed'
    })
})

app.get('/products' , (req,res)=>{
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term.'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/weather' , (req,res) => {

    if(!req.query.address){
        return res.send({
            error : 'You must provide an address!'
        })
    }

    console.log(req.query.address)
    geocode(req.query.address,(error,{ latitude,longitude,location} = {}) =>{

        

        if(error){
            return res.send({error})
        }

        console.log('Lat ' + latitude)
        console.log('Long' + longitude)

        forecast(latitude,longitude,(error,forecastdata)=>{

            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastdata,
                location,
                address : req.query.address

            })
        })
        

    })

    
})

app.listen(port, () => {

    console.log('Server has successfully started on port '+port)
})