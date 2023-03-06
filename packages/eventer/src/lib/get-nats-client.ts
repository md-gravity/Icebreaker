import nats from 'node-nats-streaming'

import type {Stan, Message} from 'node-nats-streaming'

interface ConnectOpts {
  clusterId: string
  clientId: string
  url: string
}

interface GetNATSClient {
  client?: Stan
  (): {
    connect: (opts: ConnectOpts) => Promise<Stan>
    client: Stan
  }
}

const getNATSClient: GetNATSClient = () => ({
  get client() {
    const {client} = getNATSClient
    if (!client) {
      throw Error('⚠️ NATS client is not connected')
    }
    return client
  },
  connect({clusterId, clientId, url}: ConnectOpts) {
    if (!getNATSClient.client) {
      const client = nats.connect(clusterId, clientId, {url})
      return new Promise<Stan>((resolve, reject) => {
        client.on('connect', () => {
          console.log('✅ Connected to NATS')

          getNATSClient.client = client
          resolve(client)
        })
        client.on('error', (err) => {
          reject(err)
        })
      })
    }

    return Promise.resolve(getNATSClient.client)
  },
})

export {getNATSClient}
export type {Stan, Message, ConnectOpts}
