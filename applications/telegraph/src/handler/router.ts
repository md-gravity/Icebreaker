import {joinInput} from '@app/dtos/join.input'
import {messageInput} from '@app/dtos/message.input'
import {
  messageOutput,
  type MessageOutputInterface,
} from '@app/dtos/message.output'
import {onJoinInput} from '@app/dtos/on-join.input'
import {type OnJoinOutputInterface} from '@app/dtos/on-join.output'
import {onMessageInput} from '@app/dtos/on-message.input'
import {roomOutput} from '@app/dtos/room.output'
import {protectedProcedure, router} from '@app/handler/trpc'
import {join, message, onJoin, onMessage} from '@app/services/room.service'
import {observable} from '@trpc/server/observable'

const roomRouter = router({
  join: protectedProcedure
    .input((body) => joinInput.parse(body))
    .output(roomOutput)
    .mutation(async ({input, ctx}) => join(input, ctx.jwt.userId)),
  message: protectedProcedure
    .input((body) => messageInput.parse(body))
    .output(messageOutput)
    .mutation(async ({input, ctx}) => message(input, ctx.jwt.userId)),
  onJoin: protectedProcedure
    .input((body) => onJoinInput.parse(body))
    .subscription(({input, ctx}) =>
      observable<OnJoinOutputInterface>((emit) =>
        onJoin({...input, subscriberId: ctx.jwt.userId}, emit)
      )
    ),
  onMessage: protectedProcedure
    .input((body) => onMessageInput.parse(body))
    .subscription(({input, ctx}) =>
      observable<MessageOutputInterface>((emit) =>
        onMessage({...input, subscriberId: ctx.jwt.userId}, emit)
      )
    ),
})

type RoomRouter = typeof roomRouter

export {type RoomRouter, roomRouter}
