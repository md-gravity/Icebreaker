import {type CreateMessageInputInterface} from '@app/dtos/create-message.input'
import {type CreateRoomInput} from '@app/dtos/create-room.input'
import {type FindRoomInput} from '@app/dtos/find-room.input'
import {getPrismaClient} from '@app/library/prisma-client'
import {emitRoomCreated} from '@app/services/duct.service'
import {type MessageDtoInterface, type RoomDtoInterface} from '@packages/dtos'
import {createHash} from 'node:crypto'

const createRoom = async (
  input: CreateRoomInput,
  userId: number
): Promise<RoomDtoInterface> => {
  const room = await getPrismaClient().room.create({
    data: {
      name: input?.name,
      url: createUrl(input, userId),
    },
    include: {messages: {include: {user: true}}},
  })

  await emitRoomCreated(room)

  return room
}

const findRoom = async (
  input: FindRoomInput,
  userId: number
): Promise<RoomDtoInterface | null> =>
  getPrismaClient().room.findUnique({
    include: {messages: {include: {user: true}}},
    where: {
      url: input.url,
    },
  })

const createMessage = async (
  input: CreateMessageInputInterface,
  userId: number
): Promise<MessageDtoInterface> =>
  getPrismaClient().message.create({
    data: {
      ...input,
      userId,
    },
    include: {user: true},
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

export {createRoom, createMessage, findRoom}
