import {server} from '@app/server'

import {connectEventor} from './services/eventer.service'

const start = async () => {
  await connectEventor()

  const port = process.env.PORT
  if (!port) {
    throw new Error('PORT is not defined')
  }
  server.listen(port)

  server.on('listening', () => {
    console.log(`✅ Server listening on ${port}`)
  })
}

start()
