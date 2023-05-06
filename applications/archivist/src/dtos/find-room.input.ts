import {z} from 'zod'

import {roomDto} from '@packages/dtos'

const findRoomInput = roomDto.pick({url: true})

type FindRoomInput = z.infer<typeof findRoomInput>

export {type FindRoomInput, findRoomInput}
