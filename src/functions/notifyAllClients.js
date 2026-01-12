function notifyAllClients(event, data, clients) {
  clients.forEach((client) => {
    try {
      client.write(`event: ${event}\n`)
      client.write(`data: ${JSON.stringify(data)}\n\n`)
      if (client.flush) client.flush()
    } catch (error) {
      console.error("Error SSE:", error.message)
    }
  })
}

module.exports = { notifyAllClients }
