import {joinEmitter} from '@app/services/join-emitter.service'
import {getTelegraphDbClient} from '@packages/telegraph-db'

import type {JoinRoomInputInterface} from '@app/inputs/join-room.input'
import type {JoinMessage} from '@app/services/join-emitter.service'

import type {Observer} from '@trpc/server/observable'

const join = async (input: JoinRoomInputInterface, userId: number) => {
  const room = await getTelegraphDbClient().room.findUnique({
    where: {url: input.url},
  })
  if (!room) {
    throw Error(`Could not find room with the URL "${input.url}"`)
  }

  const user = await getTelegraphDbClient().user.findUnique({
    where: {id: userId},
  })
  if (!user) {
    throw Error(`Could not find user with ID "${userId}"`)
  }

  joinEmitter.emit(room.url, {sender: user, targetRoom: room})

  return room
}

const onJoin = (
  {url, subscriberId}: JoinRoomInputInterface & {subscriberId: number},
  emit: Observer<JoinMessage, unknown>
) => {
  joinEmitter.on(url, callback)

  return () => {
    joinEmitter.off(url, callback)
  }

  async function callback({sender}: JoinMessage) {
    const sameUser = subscriberId === sender.id
    if (sameUser) {
      return
    }

    const subscribedRoom = await getTelegraphDbClient().room.findUnique({
      where: {url},
    })
    if (!subscribedRoom) {
      return emit.error(`Could not find room with the URL "${url}"`)
    }

    emit.next({sender, targetRoom: subscribedRoom})
  }
}

export {join, onJoin}
