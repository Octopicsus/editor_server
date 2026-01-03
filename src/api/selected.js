const express = require('express')
const router = express.Router()

const { readDb, writeDb } = require('../functions/db')
const linkDB = '../db/selected.json'

router.post('/selected', async (req, res) => {
  const db = await readDb(linkDB)
  db.selected = Number(req.body.selected)
  await writeDb(db, linkDB)

  res.json(db)
})

router.get('/selected', async(req,res) => {
   const db = await readDb(linkDB)

   res.json(db)
})

module.exports = router