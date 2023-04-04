import {joinRoomInput} from '@app/inputs/join-room.input'
import {join, onJoin} from '@app/services/room.service'
import {protectedProcedure, router} from '@app/trpc/trpc'
import {observable} from '@trpc/server/observable'

import type {JoinMessage} from '@app/services/join-emitter.service'

const roomRouter = router({
  join: protectedProcedure
    .input((body) => joinRoomInput.parse(body))
    .mutation(async ({input, ctx}) => join(input, ctx.jwt.userId)),
  onJoin: protectedProcedure
    .input((body) => joinRoomInput.parse(body))
    .subscription(({input, ctx}) =>
      observable<JoinMessage>((emit) =>
        onJoin({...input, subscriberId: ctx.jwt.userId}, emit)
      )
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
