if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection

db.on('error',error => console.error(error))
db.once('open',() => console.log('connected to monggoese'))



const indexRouter = require('./routes/index')
const autherRouter = require('./routes/authers')

app.set('view engine' , 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb' , extended: false}))

app.use('/',indexRouter)
app.use('/authers',autherRouter)

app.listen(process.env.PORT || 3000)