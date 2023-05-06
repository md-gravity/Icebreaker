import {createHTTPServer, type HTTPRouter, logConnections} from '@packages/rpc'

import {passportRouter} from '@app/router'
import {connectDuct} from '@app/services/duct.service'

const main = async () => {
  await connectDuct()

  const port = process.env.PORT && parseInt(process.env.PORT, 10)
  if (!port) {
    throw new Error('PORT is not defined')
  }
  const server = createHTTPServer({
    router: passportRouter as HTTPRouter,
  })

  server.listen(port)

  logConnections(server)

  server.on('listening', () => {
    console.log(`✅ Server listening on ${port}`)
  })
}

main()
