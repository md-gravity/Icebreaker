import {server} from '@app/server'

import {connectDuct} from './services/duct.service'

const start = async () => {
  await connectDuct()

  const port = process.env.PORT && parseInt(process.env.PORT, 10)
  if (!port) {
    throw new Error('PORT is not defined')
  }
  server.listen(port)

  server.on('listening', () => {
    console.log(`✅ Server listening on ${port}`)
  })
}

start()
