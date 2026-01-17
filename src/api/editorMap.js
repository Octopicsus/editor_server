const express = require("express")
const router = express.Router()

const { readDb, writeDb } = require("../functions/db")
const linkDB = "../db/productionDB.json"

//  ----------------- ROUTES

router.get("/editor", async (req, res) => {
  const db = await readDb(linkDB)

  res.json(db)
})

router.get("/editor/item", async (req, res) => {
  const db = await readDb(linkDB)
  const id = Number(req.body.id)

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
  const options = []
  const actions = req.body.actions

  const item = db.find((widget) => widget.id === id)

  if (!item) {
    item = {
      id: id,
      type: type,
      title: title,
      value: value,
      defaultValue: defaultValue,
      actions: actions,
    }
    if (item.type === "carousel") {
      item.options = []
    }
    db.push(item)
  }

  if (item) {
    item.id = id
    item.type = type
    item.title = title
    item.value = value
    item.defaultValue = defaultValue
    item.actions = actions
    if (item.type === "carousel") {
      item.options = options
    }
  }

  await writeDb(db, linkDB)

  res.json(item)
})

router.post("/editor/clean", async (req, res) => {
  const db = await readDb(linkDB)

  db = []

  await writeDb(db, linkDB)
  
  res.json(db)
})

module.exports = router
