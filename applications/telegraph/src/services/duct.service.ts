import {
  userCreatedEvent,
  connectDuct as connect,
  roomCreatedEvent,
} from '@packages/duct'

import {getPrismaClient} from '@app/library/prisma-client'

const QUEUE_GROUP_NAME = 'telegraph-service'
const ACK_WAIT_ITERATOR_TIMEOUT = 5000

const connectDuct = async () => {
  const client = await connect()

  userCreatedEvent(client).listen({
    ackWait: ACK_WAIT_ITERATOR_TIMEOUT,
    onMessage: async (data, msg) => {
      await getPrismaClient().user.create({data})
      msg.ack()
    },
    queueGroupName: QUEUE_GROUP_NAME,
  })

  roomCreatedEvent(client).listen({
    ackWait: ACK_WAIT_ITERATOR_TIMEOUT,
    onMessage: async (data, msg) => {
      await getPrismaClient().room.create({data})
      msg.ack()
    },
    queueGroupName: QUEUE_GROUP_NAME,
  })

  return client
}

export {connectDuct}
