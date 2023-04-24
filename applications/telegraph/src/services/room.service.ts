import {type JoinInputInterface} from '@app/dtos/join.input'
import {type OnJoinOutputInterface} from '@app/dtos/on-join.output'
import {type onMessageInputInterface} from '@app/dtos/on-message.input'
import {type RoomOutputInterface} from '@app/dtos/room.output'
import {getPrismaClient} from '@app/library/prisma-client'
import {joinEmitter} from '@app/services/join-emitter.service'
import {messageEmitter} from '@app/services/message-emitter.service'
import {MessageDtoInterface} from '@packages/dtos'
import {type Observer} from '@trpc/server/observable'

const join = async (
  input: JoinInputInterface,
  userId: number
): Promise<RoomOutputInterface> => {
  const room = await getPrismaClient().room.findUnique({
    where: {url: input.url},
  })
  if (!room) {
    throw Error(`Could not find room with the URL "${input.url}"`)
  }

  joinEmitter.emit(room.url, {roomId: room.id, userId})

  return room
}

const onJoin = (
  {url, subscriberId}: JoinInputInterface & {subscriberId: number},
  emit: Observer<OnJoinOutputInterface, unknown>
): (() => void) => {
  joinEmitter.on(url, callback)

  return () => {
    joinEmitter.off(url, callback)
  }

  async function callback({userId, roomId}: OnJoinOutputInterface) {
    const sameUser = subscriberId === userId
    if (sameUser) {
      return
    }

    const subscribedRoom = await getPrismaClient().room.findUnique({
      where: {url},
    })
    if (!subscribedRoom) {
      return emit.error(`Could not find room with the URL "${url}"`)
    }

    emit.next({roomId, userId})
  }
}

const message = async (
  input: MessageDtoInterface,
  userId: number
): Promise<MessageDtoInterface> => {
  const room = await getPrismaClient().room.findUnique({
    where: {id: input.roomId},
  })
  if (!room) {
    throw Error(`Could not find room with the ID "${input.roomId}"`)
  }

  const user = (await getPrismaClient().user.findUnique({
    where: {id: userId},
  }))!

  messageEmitter.emit(room.url, input)

  return input
}

const onMessage = (
  {url, subscriberId}: onMessageInputInterface & {subscriberId: number},
  emit: Observer<MessageDtoInterface, unknown>
): (() => void) => {
  messageEmitter.on(url, callback)

  return () => {
    messageEmitter.off(url, callback)
  }

  async function callback(msg: MessageDtoInterface) {
    const sameUser = subscriberId === msg.userId
    if (sameUser) {
      return
    }

    const subscribedRoom = await getPrismaClient().room.findUnique({
      where: {url},
    })
    if (!subscribedRoom) {
      return emit.error(`Could not find room with the URL "${url}"`)
    }

    emit.next(msg)
  }
}

export {join, onJoin, message, onMessage}
