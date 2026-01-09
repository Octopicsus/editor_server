const express = require("express")
const router = express.Router()

const { readDb, writeDb } = require("../functions/db")
const linkDB = "../db/valueDB.json"

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

  res.json({
    success: true,
    data: db,
  })
})

module.exports = router
