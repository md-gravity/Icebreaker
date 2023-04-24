import {z} from 'zod'

import {userDto} from './user.dto'

const messageDto = z.object({
  id: z.number(),
  roomId: z.number(),
  text: z.string(),
  user: userDto,
  userId: z.number(),
})

type MessageDtoInterface = z.infer<typeof messageDto>

export {type MessageDtoInterface, messageDto}
