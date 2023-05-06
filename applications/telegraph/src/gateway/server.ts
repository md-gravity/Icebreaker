import {createWSServer, logConnections, WSRouter} from '@packages/rpc'

import {roomRouter} from '@app/gateway/router'

const setupServer = (port: number) => {
  const server = createWSServer({router: roomRouter as WSRouter})

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
