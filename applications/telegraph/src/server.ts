import {createHandler} from '@app/trpc/handler'
import {applyWSSHandler} from '@trpc/server/adapters/ws'
import WS from 'ws'

import type {RoomRouter} from '@app/trpc/handler'

import type {Server} from 'ws'

const createServer = () => {
  let server: Server
  let handler: ReturnType<typeof applyWSSHandler>

  return {
    handleExit() {
      process.on('SIGTERM', () => {
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
    },
    listen(port: number) {
      server = new WS.Server({
        port,
      })
      server.on('listening', () => {
        console.log(`✅ WebSocket Server listening on ${port}`)
      })

      handler = createHandler(server)

      this.handleExit()
    },
    logConnections() {
      server.on('connection', (ws) => {
        console.log(`➕➕ Connection (${server.clients.size})`)
        ws.once('close', () => {
          console.log(`➖➖ Connection (${server.clients.size})`)
        })
      })
    },
  }
}

const server = createServer()

export {server}
export type {RoomRouter}
