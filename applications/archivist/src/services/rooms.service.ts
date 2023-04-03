import {CreateRoomInput} from '@app/inputs/create-room.input'
import {getArchivistDbClient} from '@packages/archivist-db'
import {createRoomEvent, getNATSClient} from '@packages/duct'
import {createHash} from 'node:crypto'

const createRoom = async (input: CreateRoomInput, userId: number) => {
  const room = await getArchivistDbClient().room.create({
    data: {
      name: input?.name,
      url: createUrl(input, userId),
    },
  })

  await createRoomEvent(getNATSClient().client).publish(room)

  return room
}

const createUrl = (input: CreateRoomInput, userId: number) => {
  const hash = createHash('sha256')
  hash.update(
    JSON.stringify({
      ...input,
      createdAt: new Date(),
      userId,
    })
  )
  return hash.digest('hex')
}

export {createRoom}
