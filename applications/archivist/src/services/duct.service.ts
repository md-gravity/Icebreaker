import {getArchivistDbClient} from '@packages/archivist-db'
import {createUserEvent, connectDuct as connect} from '@packages/duct'

const QUEUE_GROUP_NAME = 'archivist-service'
const ACK_WAIT_ITERATOR_TIMEOUT = 5000

const connectDuct = async () => {
  const client = await connect()

  createUserEvent(client).listen({
    ackWait: ACK_WAIT_ITERATOR_TIMEOUT,
    onMessage: async (data, msg) => {
      await getArchivistDbClient().user.create({data})
      msg.ack()
    },
    queueGroupName: QUEUE_GROUP_NAME,
  })

  return client
}

export {connectDuct}
