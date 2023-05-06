import {messageDto, roomDto} from '@packages/dtos'
import {protectedProcedure, router} from '@packages/rpc'

import {createMessageInput} from '@app/dtos/create-message.input'
import {createRoomInput} from '@app/dtos/create-room.input'
import {findRoomInput} from '@app/dtos/find-room.input'
import {createMessage, createRoom, findRoom} from '@app/services/rooms.service'

const archivistRouter = router({
  createMessage: protectedProcedure
    .input((body) => createMessageInput.parse(body))
    .output(messageDto)
    .mutation(({input, ctx}) => createMessage(input, ctx.jwt.userId)),
  createRoom: protectedProcedure
    .input((body) => createRoomInput.parse(body))
    .output(roomDto)
    .mutation(({input, ctx}) => createRoom(input, ctx.jwt.userId)),
  findRoom: protectedProcedure
    .input((body) => findRoomInput.parse(body))
    .output(roomDto.nullable())
    .query(({input, ctx}) => findRoom(input, ctx.jwt.userId)),
})

type ArchivistRouter = typeof archivistRouter

export {archivistRouter}
export type {ArchivistRouter}
