import {createRoomInput} from '@app/dtos/create-room.input'
import {roomOutput} from '@app/dtos/room.output'
import {protectedProcedure, router} from '@app/handler/trpc'
import {createRoom} from '@app/services/rooms.service'

const archivistRouter = router({
  createRoom: protectedProcedure
    .input((body) => createRoomInput.parse(body))
    .output(roomOutput)
    .mutation(async ({input, ctx}) => createRoom(input, ctx.jwt.userId)),
})

type ArchivistRouter = typeof archivistRouter

export {archivistRouter}
export type {ArchivistRouter}
