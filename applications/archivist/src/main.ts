import {server} from '@app/server'

import {connectDuct} from './services/duct.service'

const main = async () => {
  await connectDuct()

  const port = process.env.PORT
  if (!port) {
    throw new Error('PORT is not defined')
  }
  server.listen(port)

  server.on('listening', () => {
    console.log(`✅ Server listening on ${port}`)
  })

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

main()
