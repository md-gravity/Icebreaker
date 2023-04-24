import {roomDto} from '@packages/dtos'
import {z} from 'zod'

const findRoomInput = roomDto.pick({url: true})

type FindRoomInput = z.infer<typeof findRoomInput>

export {type FindRoomInput, findRoomInput}
