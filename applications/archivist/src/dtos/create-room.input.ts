import {z} from 'zod'

import {roomDto} from '@packages/dtos'

const createRoomInput = roomDto.partial().pick({name: true})

type CreateRoomInput = z.infer<typeof createRoomInput>

export {type CreateRoomInput, createRoomInput}
