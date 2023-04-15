import {getPrismaClient} from '@app/library/prisma-client'
import {
  createUserEvent,
  connectDuct as connect,
  createRoomEvent,
} from '@packages/duct'

const QUEUE_GROUP_NAME = 'telegraph-service'
const ACK_WAIT_ITERATOR_TIMEOUT = 5000

const connectDuct = async () => {
  const client = await connect()

  createUserEvent(client).listen({
    ackWait: ACK_WAIT_ITERATOR_TIMEOUT,
    onMessage: async (data, msg) => {
      await getPrismaClient().user.create({data})
      msg.ack()
    },
    queueGroupName: QUEUE_GROUP_NAME,
  })

  createRoomEvent(client).listen({
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
