import {messageDto, type MessageDtoInterface} from '@packages/dtos'
import {protectedProcedure, router, observable} from '@packages/rpc'

import {joinInput} from '@app/dtos/join.input'
import {type OnJoinOutputInterface} from '@app/dtos/on-join.output'
import {onMessageInput} from '@app/dtos/on-message.input'
import {roomOutput} from '@app/dtos/room.output'
import {join, message, onJoin, onMessage} from '@app/services/room.service'

const roomRouter = router({
  join: protectedProcedure
    .input((body) => joinInput.parse(body))
    .output(roomOutput)
    .mutation(async ({input, ctx}) => join(input, ctx.jwt.userId)),
  message: protectedProcedure
    .input((body) => messageDto.parse(body))
    .output(messageDto)
    .mutation(async ({input, ctx}) => message(input, ctx.jwt.userId)),
  onJoin: protectedProcedure
    .input((body) => joinInput.parse(body))
    .subscription(({input, ctx}) =>
      observable<OnJoinOutputInterface>((emit) =>
        onJoin({...input, subscriberId: ctx.jwt.userId}, emit)
      )
    ),
  onMessage: protectedProcedure
    .input((body) => onMessageInput.parse(body))
    .subscription(({input, ctx}) =>
      observable<MessageDtoInterface>((emit) =>
        onMessage({...input, subscriberId: ctx.jwt.userId}, emit)
      )
    ),
})

type RoomRouter = typeof roomRouter

export {type RoomRouter, roomRouter}
