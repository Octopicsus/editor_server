const express = require('express')
const cors = require('cors')
const app = express()

const PORT = require('./config/port.js')

const apiGauge = require('./src/api/gaugeValue')
const apiCarousel = require('./src/api/carouselValue')
const apiSettings = require('./src/api/settingsMap')

app.use(express.json())
app.use(cors())

app.use('/api', apiSettings)
app.use('/api', apiGauge)
app.use('/api', apiCarousel)

app.listen(PORT, () => {
    console.log(`Server started: ${PORT}`)
})