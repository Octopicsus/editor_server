const express = require("express")
const cors = require("cors")
const app = express()

const PORT = require("./config/port.js")

const apiSettings = require("./src/api/settingsMap")
const apiValuesMap = require("./src/api/valuesMap.js")

app.use(express.json())
app.use(cors())

app.use("/api", apiSettings)
app.use("/api", apiValuesMap)

app.listen(PORT, () => {
  console.log(`Server started: ${PORT}`)
})
