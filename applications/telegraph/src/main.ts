import {createWSServer, logConnections, type WSRouter} from '@packages/rpc'

import {roomRouter} from '@app/router'
import {connectDuct} from '@app/services/duct.service'

const main = async () => {
  await connectDuct()

  const port = process.env.PORT && parseInt(process.env.PORT, 10)
  if (!port) {
    throw new Error('PORT is not defined')
  }

  const server = createWSServer({router: roomRouter as WSRouter})

  server.listen(port)

  logConnections(server.getWS())
}

main()
