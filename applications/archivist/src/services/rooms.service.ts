import {type CreateRoomInput} from '@app/dtos/create-room.input'
import {getPrismaClient} from '@app/library/prisma-client'
import {emitRoomCreated} from '@app/services/duct.service'
import {createHash} from 'node:crypto'

const createRoom = async (input: CreateRoomInput, userId: number) => {
  const room = await getPrismaClient().room.create({
    data: {
      name: input?.name,
      url: createUrl(input, userId),
    },
  })

  await emitRoomCreated(room)

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
