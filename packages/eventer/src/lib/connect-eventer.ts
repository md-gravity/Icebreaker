import {getNATSClient} from './get-nats-client'

const connectEventer = async () => {
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('Define "NATS_CLUSTER_ID" in env')
  }
  if (!process.env.NATS_URL) {
    throw new Error('Define "NATS_URL" in env')
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('Define "NATS_CLIENT_ID" in env')
  }

  const client = await getNATSClient().connect({
    clientId: process.env.NATS_CLIENT_ID,
    clusterId: process.env.NATS_CLUSTER_ID,
    url: process.env.NATS_URL,
  })
  client.on('close', () => {
    console.log('⚠️ NATS connection closed!')
    process.exit()
  })

  process.on('SIGINT', () => client.close())
  process.on('SIGTERM', () => client.close())

  return client
}

export {connectEventer}
