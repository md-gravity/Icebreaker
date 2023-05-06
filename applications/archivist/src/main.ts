import {createHTTPServer, type HTTPRouter, logConnections} from '@packages/rpc'

import {archivistRouter} from '@app/router'
import {connectDuct} from '@app/services/duct.service'

const main = async () => {
  await connectDuct()

  const port = process.env.PORT
  if (!port) {
    throw new Error('PORT is not defined')
  }

  const server = createHTTPServer({
    router: archivistRouter as HTTPRouter,
  })

  server.listen(port)

  logConnections(server)

  server.on('listening', () => {
    console.log(`✅ Server listening on ${port}`)
  })
}

main()
