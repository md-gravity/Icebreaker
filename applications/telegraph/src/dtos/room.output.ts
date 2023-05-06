import {z} from 'zod'

import {roomDto} from '@packages/dtos'

const roomOutput = roomDto.pick({
  id: true,
  name: true,
  url: true,
})

type RoomOutputInterface = z.infer<typeof roomOutput>

export {type RoomOutputInterface, roomOutput}
