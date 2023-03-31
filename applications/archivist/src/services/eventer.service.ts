import {getArchivistDbClient} from '@packages/archivist-db'
import {
  createUserEventer,
  connectEventor as connect,
  createRoomEventer,
} from '@packages/eventer'

const QUEUE_GROUP_NAME = 'archivist-service'
const ACK_WAIT_ITERATOR_TIMEOUT = 5000

const connectEventor = async () => {
  const client = await connect()

  createUserEventer(client).listen({
    ackWait: ACK_WAIT_ITERATOR_TIMEOUT,
    onMessage: async (data, msg) => {
      await getArchivistDbClient().user.create({data})
      msg.ack()
    },
    queueGroupName: QUEUE_GROUP_NAME,
  })
  createRoomEventer(client).listen({
    ackWait: ACK_WAIT_ITERATOR_TIMEOUT,
    onMessage: async (data, msg) => {
      console.log(data)
      msg.ack()
    },
    queueGroupName: QUEUE_GROUP_NAME,
  })

  return client
}

export {connectEventor}
