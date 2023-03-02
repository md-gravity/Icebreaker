import {server} from '@app/server'

const start = () => {
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
