const express = require("express")
const router = express.Router()

const { readDb, writeDb } = require("../functions/db")
const linkDB = "../db/valueDB.json"

const responseData = (item) => {
  if (item.type === "carousel") {
    return {
      id: item.id,
      type: item.type,
      title: item.title,
      value: item.value,
      defaultValue: item.defaultValue,
      options: item.options,
      action: item.action,
    }
  }

  if (item.type === "gauge") {
    return {
      id: item.id,
      type: item.type,
      title: item.title,
      value: item.value,
      defaultValue: item.defaultValue,
      action: item.action,
    }
  }
}

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

  res.json(db)
})

router.get("/settings/values", async (req, res) => {
  const db = await readDb(linkDB)
  const id = Number(req.query.id)

  const item = db.find((widget) => widget.id === id)

  res.json(responseData(item))
})

router.post("/settings/values", async (req, res) => {
  const db = await readDb(linkDB)
  const id = Number(req.body.id)
  const value = Number(req.body.value)

  const item = db.find((widget) => widget.id === id)
  item.value = value

  await writeDb(db, linkDB)

  res.json(responseData(item))
})

router.get("/settings", async (req, res) => {
  const db = await readDb(linkDB)
  res.json(db)
})

module.exports = router
