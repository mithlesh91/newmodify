const express = require('express')
const cookeiparser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')



const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookeiparser())
app.use(express.static('./public'))
app.use(cors({
    origin: 'https://newmodify.onrender.com',
    credentials: true
}))

// routers
const routers = require('./routers/auth.routers')
const songrouters = require('./routers/song.routers')

// prefix routers
app.use('/auth',routers)
app.use('/songs',songrouters)


module.exports = app