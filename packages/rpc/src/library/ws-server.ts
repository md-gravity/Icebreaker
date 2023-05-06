import {applyWSSHandler} from '@trpc/server/adapters/ws'
import {observable} from '@trpc/server/observable'
import {WSSHandlerOptions} from '@trpc/server/src/adapters/ws'
import {AnyRouter} from '@trpc/server/src/core'
import WS, {type Server} from 'ws'

import {createContext} from './context'

type WSRouter = WSSHandlerOptions<AnyRouter>['router']

const createWSServer = ({router}: {router: WSRouter}) => {
  let server: Server
  let handler: ReturnType<typeof applyWSSHandler>

  return {
    getWS() {
      return server
    },
    listen(port: number) {
      server = new WS.Server({
        port,
      })
      server.on('listening', () => {
        console.log(`✅ WebSocket Server listening on ${port}`)
      })

      handler = applyWSSHandler({
        createContext,
        router,
        wss: server,
      })

      this.onTerminate()
    },
    onTerminate() {
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
  }
}

export {createWSServer, type WSRouter, observable}
