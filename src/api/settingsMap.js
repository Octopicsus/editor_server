const express = require('express')
const router = express.Router()

const {readDb} = require('../functions/db')
const linkDB = '../db/valueDB.json'

router.get('/settings', async (req, res) => {
    const db = await readDb(linkDB)

    res.json(db)
})

module.exports = router