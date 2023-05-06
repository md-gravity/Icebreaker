import {Server as HTTPServer} from 'node:http'

import {Server as WSServer} from 'ws'

const logConnections = (server: HTTPServer | WSServer) => {
  server.on('connection', (ws) => {
    getConnection()

    ws.once('close', () => {
      getConnection()
    })
  })

  function getConnection() {
    if ('getConnections' in server) {
      server.getConnections((err, connections) => {
        if (err) {
          console.error(err)
        } else {
          console.log(`Connections: (${connections})`)
        }
      })
    }

    if ('clients' in server) {
      console.log(`Connections: (${server.clients.size})`)
    }
  }
}

export {logConnections}
