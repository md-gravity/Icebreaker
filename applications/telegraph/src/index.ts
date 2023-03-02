import {createServer} from '@app/server'

const start = () => {
  const port = process.env.PORT
  if (!port) {
    throw new Error('PORT is not defined')
  }

  const {server, handler} = createServer(parseInt(port, 10))

  server.on('connection', (ws) => {
    console.log(`➕➕ Connection (${server.clients.size})`)
    ws.once('close', () => {
      console.log(`➖➖ Connection (${server.clients.size})`)
    })
  })
  console.log(`✅ WebSocket Server listening on ${port}`)

  process.on('SIGTERM', () => {
    console.log('SIGTERM')
    handler.broadcastReconnectNotification()
    server.clients.forEach((socket) => {
      socket.terminate()
    })
    server.close((err) => {
      if (err) {
        console.error(err)
      } else {
        console.log('❎ WebSocket Server closed')
      }
    })
  })
}

export {start}
