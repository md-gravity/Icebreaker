import {joinRoomInput} from '@app/inputs/join-room.input'
import {roomMessagesInput} from '@app/inputs/room-message.input'
import {roomSubscriptionInput} from '@app/inputs/room-subscribtion.input'
import {Events} from '@app/lib/events'
import {emitter} from '@app/utils/emitter'
import {initTRPC} from '@trpc/server'
import {observable} from '@trpc/server/observable'
import crypto from 'node:crypto'

import type {RoomMessageInputInterface} from '@app/inputs/room-message.input'
import type {EmittedRoomMessageInterface} from '@app/interfaces/emitted-room-message.interface'
import type {RoomInterface} from '@app/interfaces/room.interface'

const roomsById: {[id: RoomInterface['id']]: RoomInterface} = {}

const tRPC = initTRPC.create()
const {router, procedure} = tRPC

const roomRouter = router({
  join: procedure
    .input((body) => joinRoomInput.parse(body))
    .mutation(async ({input}) => {
      if (input.id) {
        return roomsById[input.id]
      }

      const newRoomId = crypto
        .createHash('md5')
        .update(JSON.stringify({data: new Date(), name: input.name}))
        .digest('hex')
      const newRoom = {
        id: newRoomId,
        messages: [],
        name: input.name,
      }
      roomsById[newRoomId] = newRoom

      return newRoom
    }),
  message: procedure
    .input((body) => roomMessagesInput.parse(body))
    .mutation(({input}) => {
      const message = input
      const room = roomsById[message.roomId]

      room.messages.push(message)

      emitter.emit(
        Events.message,
        JSON.stringify(message as EmittedRoomMessageInterface)
      )
    }),
  onMessage: procedure
    .input((body) => roomSubscriptionInput.parse(body))
    .subscription(({input}) =>
      observable<RoomMessageInputInterface>((emit) => {
        const observableRoomId = input.roomId
        const subscribedUser = input.user

        emitter.on(Events.message, onMessage)
        return () => {
          emitter.off(Events.message, onMessage)
        }

        function onMessage(rawMessage: string) {
          const message: EmittedRoomMessageInterface = JSON.parse(rawMessage)

          const roomSubscribed = message.roomId === observableRoomId
          const sameUser = subscribedUser.id === message.user.id

          if (roomSubscribed && !sameUser) {
            emit.next(message)
          }
        }
      })
    ),
})

type RoomRouter = typeof roomRouter

export {roomRouter}
export type {RoomRouter}
