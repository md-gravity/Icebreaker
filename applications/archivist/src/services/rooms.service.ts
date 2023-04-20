import {type CreateMessageInputInterface} from '@app/dtos/create-message.input'
import {type CreateRoomInput} from '@app/dtos/create-room.input'
import {FindRoomByUrlInput} from '@app/dtos/find-room-by-url.input'
import {type MessageOutputInterface} from '@app/dtos/message.output'
import {type RoomOutputInterface} from '@app/dtos/room.output'
import {getPrismaClient} from '@app/library/prisma-client'
import {emitRoomCreated} from '@app/services/duct.service'
import {createHash} from 'node:crypto'

const createRoom = async (
  input: CreateRoomInput,
  userId: number
): Promise<RoomOutputInterface> => {
  const room = await getPrismaClient().room.create({
    data: {
      name: input?.name,
      url: createUrl(input, userId),
    },
  })

  await emitRoomCreated(room)

  return room
}

const findRoomByUrl = async (
  input: FindRoomByUrlInput,
  userId: number
): Promise<RoomOutputInterface> => {
  const room = await getPrismaClient().room.findUnique({
    where: {
      url: input.url,
    },
  })
  if (!room) {
    throw Error(`Could not find room with the URL "${input.url}"`)
  }

  return room
}

const createMessage = async (
  input: CreateMessageInputInterface,
  userId: number
): Promise<MessageOutputInterface> =>
  getPrismaClient().message.create({
    data: {
      ...input,
      userId,
    },
  })

const createUrl = (input: CreateRoomInput, userId: number): string => {
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

export {createRoom, createMessage, findRoomByUrl}
