import {Server as HTTPServer} from 'node:http'

import {Server as WSServer} from 'ws'

const logConnections = (server: HTTPServer | WSServer) => {
  server.on('connection', (ws) => {
    const connections =
      'connections' in server ? server.connections : server.clients.size
    console.log(`➕➕ Connection (${connections})`)
    ws.once('close', () => {
      console.log(`➖➖ Connection (${connections})`)
    })
  })
}

export {logConnections}
