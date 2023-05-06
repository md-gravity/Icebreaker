import {applyWSSHandler} from '@trpc/server/adapters/ws'
import {
  observable,
  type Observable,
  type Observer,
} from '@trpc/server/observable'
import {type WSSHandlerOptions} from '@trpc/server/src/adapters/ws'
import {type AnyRouter} from '@trpc/server/src/core'
import WS, {type Server} from 'ws'

import {createContext} from '../library/context'

import {type ServerInterface} from './server.interface'

type WSRouter = WSSHandlerOptions<AnyRouter>['router']

const createWSServer = ({router}: {router: WSRouter}): ServerInterface => {
  let server: Server
  let handler: ReturnType<typeof applyWSSHandler>

  return {
    async close() {
      return new Promise((resolve, reject) => {
        server.clients.forEach((socket) => {
          socket.terminate()
        })

        server.close((err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    },
    async getConnectionsCount() {
      return server.clients.size
    },
    listen(port: number) {
      server = new WS.Server({
        port,
      })

      handler = applyWSSHandler({
        createContext,
        router,
        wss: server,
      })

      process.on('SIGTERM', async () => {
        handler.broadcastReconnectNotification()

        await this.close()
      })
    },
    onClose(cb) {
      server.on('close', cb)
    },
    onConnection(cb) {
      server.on('connection', cb)
    },
    onListen(cb) {
      server.on('listening', cb)
    },
  }
}

export {
  createWSServer,
  type WSRouter,
  observable,
  type Observable,
  type Observer,
}
