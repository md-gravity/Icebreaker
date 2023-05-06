import {roomDto} from '@packages/dtos'
import {
  connectDuct as connect,
  userCreatedEvent,
  type RoomCreatedEvent,
  roomCreatedEvent,
  getNATSClient,
} from '@packages/duct'

import {getPrismaClient} from '@app/library/prisma-client'

const QUEUE_GROUP_NAME = 'archivist-service'
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

  return client
}

const emitRoomCreated = async (room: RoomCreatedEvent['data']) =>
  roomCreatedEvent(getNATSClient().client).publish(
    roomDto
      .pick({
        id: true,
        name: true,
        url: true,
      })
      .parse(room)
  )

export {connectDuct, emitRoomCreated}
