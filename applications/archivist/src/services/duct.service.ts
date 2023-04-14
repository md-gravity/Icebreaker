import {roomOutput} from '@app/dtos/room.output'
import {getPrismaClient} from '@app/library/prisma-client'
import {
  connectDuct as connect,
  createRoomEvent,
  CreateRoomEvent,
  createUserEvent,
  getNATSClient,
} from '@packages/duct'

const QUEUE_GROUP_NAME = 'archivist-service'
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

  return client
}

const emitRoomCreated = async (room: CreateRoomEvent['data']) => {
  await createRoomEvent(getNATSClient().client).publish(roomOutput.parse(room))
}

export {connectDuct, emitRoomCreated}
