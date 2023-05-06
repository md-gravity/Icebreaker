import {ServerInterface} from '../gateways/server.interface'

const logConnections = (server: ServerInterface) => {
  server.onConnection(async (ws) => {
    console.log(`Connection: ++${await server.getConnectionsCount()}`)

    ws.once('close', async () => {
      console.log(`Connection: --${await server.getConnectionsCount()}`)
    })
  })
}

export {logConnections}
