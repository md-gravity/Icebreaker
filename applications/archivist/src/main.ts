import {setupServer} from '@app/gateway/server'
import {connectDuct} from '@app/services/duct.service'

const main = async () => {
  await connectDuct()

  const port = process.env.PORT && parseInt(process.env.PORT, 10)
  if (!port) {
    throw new Error('PORT is not defined')
  }

  setupServer(port)
}

main()
