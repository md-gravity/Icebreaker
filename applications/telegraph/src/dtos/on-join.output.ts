import {messageDto} from '@packages/dtos'
import {z} from 'zod'

const onJoinOutput = messageDto.pick({
  roomId: true,
  userId: true,
})

type OnJoinOutputInterface = z.infer<typeof onJoinOutput>

export {type OnJoinOutputInterface, onJoinOutput}
