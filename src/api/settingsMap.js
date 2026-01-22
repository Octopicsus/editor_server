const express = require("express")
const router = express.Router()

const { readDb, writeDb } = require("../functions/db")
const { notifyAllClients } = require("../functions/notifyAllClients")
const linkDB = "../db/productionDB.json"

let clients = []

// ------------ SSE

router.get("/settings/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream")
  clients.push(res)

  req.on("close", () => {
    clients = clients.filter((client) => client !== res)
  })
})

//  ----------------- ROUTES

router.get("/settings", async (req, res) => {
  const db = await readDb(linkDB)

  res.json(db)
})

router.post("/settings/reset", async (req, res) => {
  const db = await readDb(linkDB)

  db.forEach((item) => {
    item.value = item.defaultValue
  })

  await writeDb(db, linkDB)
  notifyAllClients("settings-reset", db, clients)

  res.json(db)
})

router.get("/settings/values", async (req, res) => {
  const db = await readDb(linkDB)
  const id = Number(req.query.id)

  const item = db.find((widget) => widget.id === id)

  res.json(item)
})

router.post("/settings/values", async (req, res) => {
  const db = await readDb(linkDB)
  const id = Number(req.body.id)
  const value = Number(req.body.value)

  const item = db.find((widget) => widget.id === id)
  item.value = value

  await writeDb(db, linkDB)

  notifyAllClients(
    "settings-updated",
    {
      id: id,
      value: value,
      timestamp: Date.now(),
    },
    clients
  )

  res.json(item)
})

module.exports = router
module.exports.clients = clients
