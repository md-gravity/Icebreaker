import {
  createUserEvent,
  connectDuct as connect,
  createRoomEvent,
} from '@packages/duct'
import {getTelegraphDbClient} from '@packages/telegraph-db'

const QUEUE_GROUP_NAME = 'telegraph-service'
const ACK_WAIT_ITERATOR_TIMEOUT = 5000

const connectDuct = async () => {
  const client = await connect()

  createUserEvent(client).listen({
    ackWait: ACK_WAIT_ITERATOR_TIMEOUT,
    onMessage: async (data, msg) => {
      await getTelegraphDbClient().user.create({data})
      msg.ack()
    },
    queueGroupName: QUEUE_GROUP_NAME,
  })

  createRoomEvent(client).listen({
    ackWait: ACK_WAIT_ITERATOR_TIMEOUT,
    onMessage: async (data, msg) => {
      await getTelegraphDbClient().room.create({data})
      msg.ack()
    },
    queueGroupName: QUEUE_GROUP_NAME,
  })

  return client
}

export {connectDuct}
