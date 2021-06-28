const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

 app.get('',(req, res)=>{
    res.render('index',{
        title:"Weather",
        name: "Naman",
    })
})

app.get('/help',(req, res)=>{
    res.render('halo',{
        message:"This is the help message",
        title: "Help",
        name:"Naman"
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About me',
        name:"Naman"
    })
})


app.get('/weather',(req,res)=>{
    address=req.query.address
    if(!address){
        return res.send({error:'You must provide an address'})
    }
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude,(error,forcastData)=>{
            if(error){
                return res.send({error})
            } 
            res.send({
                address:address,
                location,
                forecast: forcastData 
            })
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a seach term"
        })
    }
    console.log(req.query) 
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:"Naman",
        errorMessage:"Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Naman",
        errorMessage:"404 Page not found"
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})

