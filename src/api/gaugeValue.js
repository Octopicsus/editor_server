const express = require('express')
const router = express.Router()

const { readDb, writeDb } = require('../functions/db')
const linkDB = '../db/valueDB.json'

router.post('/valueGauge', async (req, res) => {
    const db = await readDb(linkDB)
    const item = db.find((widget) => widget.type === 'gauge')
    item.value = Number(req.body.value)
    await writeDb(db, linkDB)

    res.json({
        id: item.id, type: item.type, title: item.title, value: item.value, defaultValue: item.defaultValue, action: item.action
    })
})

router.get('/valueGauge', async (req, res) => {
    const db = await readDb(linkDB)
    const item = db.find((widget) => widget.type === 'gauge')

    res.json({
        id: item.id,
        type: item.type,
        title: item.title,
        value: item.value,
        defaultValue: item.defaultValue,
        action: item.action
    })
})

module.exports = router