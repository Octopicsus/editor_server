const fs = require('fs/promises')
const path = require('path')

async function readDb(link) {
  const dbPath = path.resolve(__dirname, link)
  const raw = await fs.readFile(dbPath, 'utf8')

  return JSON.parse(raw)
}

async function writeDb(db, link) {
  const dbPath = path.resolve(__dirname, link)
  const json = JSON.stringify(db, null, 2)

  await fs.writeFile(dbPath, json)
}

module.exports = { readDb, writeDb }