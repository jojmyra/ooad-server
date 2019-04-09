const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

process.env.NODE_ENV = 'development'

const config = require('./config/config')

mongoose.connect(global.gConfig.database,  
  { useNewUrlParser: true,
    useCreateIndex: true, })
mongoose.Promise = global.Promise;


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


// routes
const personRoutes = require('./api/routes/person')
const subjectRoutes = require('./api/routes/subject')
const roomRoutes = require('./api/routes/room')
const buildingRoutes = require('./api/routes/building')
const courseRoutes = require('./api/routes/course')

app.use(`/api/person`, personRoutes)
app.use(`/api/subject`, subjectRoutes)
app.use(`/api/course`, courseRoutes)
app.use(`/api/room`, roomRoutes)
app.use(`/api/building`, buildingRoutes)

module.exports = app;