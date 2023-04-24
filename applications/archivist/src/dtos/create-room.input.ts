import {roomDto} from '@packages/dtos'
import {z} from 'zod'

const createRoomInput = roomDto.partial().pick({name: true})

type CreateRoomInput = z.infer<typeof createRoomInput>

export {type CreateRoomInput, createRoomInput}
