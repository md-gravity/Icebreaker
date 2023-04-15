import {joinInput} from '@app/dtos/join.input'
import {OnJoinOutputInterface} from '@app/dtos/on-join.output'
import {roomOutput} from '@app/dtos/room.output'
import {protectedProcedure, router} from '@app/handler/trpc'
import {join, onJoin} from '@app/services/room.service'
import {observable} from '@trpc/server/observable'

const roomRouter = router({
  join: protectedProcedure
    .input((body) => joinInput.parse(body))
    .output(roomOutput)
    .mutation(async ({input, ctx}) => join(input, ctx.jwt.userId)),
  onJoin: protectedProcedure
    .input((body) => joinInput.parse(body))
    .subscription(({input, ctx}) =>
      observable<OnJoinOutputInterface>((emit) =>
        onJoin({...input, subscriberId: ctx.jwt.userId}, emit)
      )
    ),
})

type RoomRouter = typeof roomRouter

export {type RoomRouter, roomRouter}
