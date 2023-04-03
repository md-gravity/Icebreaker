import {createRoomInput} from '@app/inputs/create-room.input'
import {createRoom} from '@app/services/rooms.service'
import {protectedProcedure, router} from '@app/trpc/trpc'

const archivistRouter = router({
  createRoom: protectedProcedure
    .input((body) => createRoomInput.parse(body))
    .mutation(async ({input, ctx}) => createRoom(input, ctx.jwt.userId)),
})

type ArchivistRouter = typeof archivistRouter

export {archivistRouter}
export type {ArchivistRouter}
