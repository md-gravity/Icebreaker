import http from 'node:http'
import {promisify} from 'node:util'

import {createHTTPHandler} from '@trpc/server/adapters/standalone'
import {type CreateHTTPHandlerOptions} from '@trpc/server/src/adapters/standalone'
import {type AnyRouter} from '@trpc/server/src/core'

import {createContext} from '../library/context'

import {type ServerInterface} from './server.interface'

type HTTPRouter = CreateHTTPHandlerOptions<AnyRouter>['router']

const createHTTPServer = ({router}: {router: HTTPRouter}): ServerInterface => {
  const handler = createHTTPHandler({
    createContext,
    router,
  })

  const server = new http.Server((req, res) => {
    handler(req, res)
  })
  const getConnectionsCount = promisify(server.getConnections.bind(server))
  const close = promisify(server.close)

  return {
    async close() {
      return close()
    },
    async getConnectionsCount() {
      return getConnectionsCount()
    },
    listen(port: number, cb?: () => void) {
      server.listen(port, cb)

      process.on('SIGTERM', async () => {
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

export {createHTTPServer, type HTTPRouter}
