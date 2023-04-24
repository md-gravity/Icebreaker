import {roomDto} from '@packages/dtos'
import {z} from 'zod'

const roomOutput = roomDto.pick({
  id: true,
  name: true,
  url: true,
})

type RoomOutputInterface = z.infer<typeof roomOutput>

export {type RoomOutputInterface, roomOutput}
