import {createHTTPServer, HTTPRouter, logConnections} from '@packages/rpc'

import {archivistRouter} from '@app/gateway/router'

const setupServer = (port: number) => {
  const server = createHTTPServer({
    router: archivistRouter as HTTPRouter,
  })

  server.listen(port)

  server.onListen(() => {
    console.log(`✅ Server listening on ${port}`)
  })

  server.onClose(() => {
    console.log(`❎ Server closed`)
  })

  logConnections(server)

  return server
}

export {setupServer}
