const express = require("express")
const router = express.Router()

const { readDb, writeDb } = require("../functions/db")
const { notifyAllClients } = require("../functions/notifyAllClients")
const settingsMap = require("./settingsMap")
const linkDB = "../db/productionDB.json"

//  ----------------- ROUTES

router.get("/editor", async (req, res) => {
  const db = await readDb(linkDB)

  res.json(db)
})

router.get("/editor/item", async (req, res) => {
  const db = await readDb(linkDB)
  const id = Number(req.query.id)

  const item = db.find((widget) => widget.id === id)

  res.json(item)
})

router.post("/editor/item", async (req, res) => {
  const db = await readDb(linkDB)
  const id = Number(req.body.id)
  const type = req.body.type
  const title = req.body.title
  const value = Number(req.body.value)
  const defaultValue = Number(req.body.defaultValue)
  const options = req.body.options || []
  const action = req.body.action

  let item = db.find((widget) => widget.id === id)

  if (item) {
    item.id = id
    item.type = type
    item.title = title
    item.value = value
    item.defaultValue = defaultValue
    item.action = action
    if (type === "carousel") item.options = options
  }

  if (!item) {
    item = { id, type, title, value, defaultValue, action }
    if (type === "carousel") item.options = options
    db.push(item)
  }

  await writeDb(db, linkDB)

  const clients = settingsMap.clients
  notifyAllClients("settings-list-updated", db, clients)

  res.json(item)
})

router.post("/editor/clean", async (req, res) => {
  await writeDb([], linkDB)

  const clients = settingsMap.clients
  notifyAllClients("settings-list-updated", [], clients)

  res.json([])
})

module.exports = router
