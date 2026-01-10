const express = require("express")
const cors = require("cors")
const app = express()

const PORT = require("./config/port.js")

const apiSettingsMap = require("./src/api/settingsMap.js")

app.use(express.json())
app.use(cors())

app.use("/api", apiSettingsMap)

app.listen(PORT, () => {
  console.log(`Server started: ${PORT}`)
})
