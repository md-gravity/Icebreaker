import {createMessageInput} from '@app/dtos/create-message.input'
import {createRoomInput} from '@app/dtos/create-room.input'
import {findRoomByUrlInput} from '@app/dtos/find-room-by-url.input'
import {messageOutput} from '@app/dtos/message.output'
import {roomOutput} from '@app/dtos/room.output'
import {protectedProcedure, router} from '@app/handler/trpc'
import {
  createMessage,
  createRoom,
  findRoomByUrl,
} from '@app/services/rooms.service'

const archivistRouter = router({
  createMessage: protectedProcedure
    .input((body) => createMessageInput.parse(body))
    .output(messageOutput)
    .mutation(async ({input, ctx}) => createMessage(input, ctx.jwt.userId)),
  createRoom: protectedProcedure
    .input((body) => createRoomInput.parse(body))
    .output(roomOutput)
    .mutation(async ({input, ctx}) => createRoom(input, ctx.jwt.userId)),
  findRoomByUrl: protectedProcedure
    .input((body) => findRoomByUrlInput.parse(body))
    .output(roomOutput)
    .query(async ({input, ctx}) => findRoomByUrl(input, ctx.jwt.userId)),
})

type ArchivistRouter = typeof archivistRouter

export {archivistRouter}
export type {ArchivistRouter}
