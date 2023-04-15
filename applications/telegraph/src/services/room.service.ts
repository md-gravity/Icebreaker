import {type JoinInputInterface} from '@app/dtos/join.input'
import {type OnJoinOutputInterface} from '@app/dtos/on-join.output'
import {getPrismaClient} from '@app/library/prisma-client'
import {joinEmitter} from '@app/services/join-emitter.service'
import {type Observer} from '@trpc/server/observable'

const join = async (input: JoinInputInterface, userId: number) => {
  const room = await getPrismaClient().room.findUnique({
    where: {url: input.url},
  })
  if (!room) {
    throw Error(`Could not find room with the URL "${input.url}"`)
  }

  const user = await getPrismaClient().user.findUnique({
    where: {id: userId},
  })
  if (!user) {
    throw Error(`Could not find user with ID "${userId}"`)
  }

  joinEmitter.emit(room.url, {sender: user, targetRoom: room})

  return room
}

const onJoin = (
  {url, subscriberId}: JoinInputInterface & {subscriberId: number},
  emit: Observer<OnJoinOutputInterface, unknown>
) => {
  joinEmitter.on(url, callback)

  return () => {
    joinEmitter.off(url, callback)
  }

  async function callback({sender}: OnJoinOutputInterface) {
    const sameUser = subscriberId === sender.id
    if (sameUser) {
      return
    }

    const subscribedRoom = await getPrismaClient().room.findUnique({
      where: {url},
    })
    if (!subscribedRoom) {
      return emit.error(`Could not find room with the URL "${url}"`)
    }

    emit.next({sender, targetRoom: subscribedRoom})
  }
}

export {join, onJoin}
