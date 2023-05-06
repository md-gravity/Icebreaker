import http from 'node:http'

import {createHTTPHandler} from '@trpc/server/adapters/standalone'
import {CreateHTTPHandlerOptions} from '@trpc/server/src/adapters/standalone'
import {AnyRouter} from '@trpc/server/src/core'

import {createContext} from './context'

type HTTPRouter = CreateHTTPHandlerOptions<AnyRouter>['router']

const createHTTPServer = ({router}: {router: HTTPRouter}) => {
  const handler = createHTTPHandler({
    createContext,
    router,
  })

  const server = new http.Server((req, res) => {
    handler(req, res)
  })

  onTerminate()

  return server

  function onTerminate() {
    process.on('SIGTERM', () => {
      server.close((err) => {
        if (err) {
          console.error(err)
        } else {
          console.log('❎ Server closed')
        }
      })
    })
  }
}

export {createHTTPServer, type HTTPRouter}
