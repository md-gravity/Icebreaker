import {z} from 'zod'

import {messageDto} from './message.dto'

const roomDto = z.object({
  id: z.number(),
  messages: z.array(messageDto),
  name: z.string().nullable(),
  url: z.string(),
})

type RoomDtoInterface = z.infer<typeof roomDto>

export {type RoomDtoInterface, roomDto}
