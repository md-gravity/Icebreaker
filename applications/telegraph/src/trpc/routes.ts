import {joinRoomInput} from '@app/inputs/join-room.input'
import {emitJoinRoom, onJoinRoom, removeOnJoinRoom} from '@app/lib/events'
import {protectedProcedure, router} from '@app/trpc/trpc'
import {getTelegraphDbClient} from '@packages/telegraph-db'
import {observable} from '@trpc/server/observable'

import type {OnJoinRoomInputInterface} from '@app/inputs/on-join-room.input'

const roomRouter = router({
  join: protectedProcedure
    .input((body) => joinRoomInput.parse(body))
    .mutation(async ({input, ctx}) => {
      const room = await getTelegraphDbClient().room.findUnique({
        where: {url: input.url},
      })
      if (!room) {
        throw Error(`Could not find room with the URL "${input.url}"`)
      }

      const user = (await getTelegraphDbClient().user.findUnique({
        where: {id: ctx.jwt.userId},
      }))!

      emitJoinRoom({roomId: room.id, user})

      return room
    }),
  onJoin: protectedProcedure
    .input((body) => joinRoomInput.parse(body))
    .subscription(({input, ctx}) =>
      observable<OnJoinRoomInputInterface>((emit) => {
        const callback = async ({user}) => {
          if (user.id !== ctx.jwt.userId) {
            return
          }

          const room = await getTelegraphDbClient().room.findUnique({
            where: {url: input.url},
          })
          if (!room) {
            throw Error(`Could not find room with the URL "${input.url}"`)
          }

          emit.next({roomId: room.id, user})
        }

        onJoinRoom(callback)

        return () => {
          removeOnJoinRoom(callback)
        }
      })
    ),
  /*
   * Message: procedure
   *   .input((body) => roomMessagesInput.parse(body))
   *   .mutation(({input}) => {
   *     const message = input
   *     const room = roomsById[message.roomId]
   *
   *     room.messages.push(message)
   *
   *     emitter.emit(
   *       Events.message,
   *       JSON.stringify(message as EmittedRoomMessageInterface)
   *     )
   *   }),
   * onMessage: procedure
   *   .input((body) => roomSubscriptionInput.parse(body))
   *   .subscription(({input}) =>
   *     observable<RoomMessageInputInterface>((emit) => {
   *       const observableRoomId = input.roomId
   *       const subscribedUser = input.user
   *
   *       emitter.on(Events.message, onMessage)
   *       return () => {
   *         emitter.off(Events.message, onMessage)
   *       }
   *
   *       function onMessage(rawMessage: string) {
   *         const message: EmittedRoomMessageInterface = JSON.parse(rawMessage)
   *
   *         const roomSubscribed = message.roomId === observableRoomId
   *         const sameUser = subscribedUser.id === message.user.id
   *
   *         if (roomSubscribed && !sameUser) {
   *           emit.next(message)
   *         }
   *       }
   *     })
   *   ),
   */
})

type RoomRouter = typeof roomRouter

export {roomRouter}
export type {RoomRouter}
