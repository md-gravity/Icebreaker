import {z} from 'zod'

import {messageDto} from '@packages/dtos'

const onJoinOutput = messageDto.pick({
  roomId: true,
  userId: true,
})

type OnJoinOutputInterface = z.infer<typeof onJoinOutput>

export {type OnJoinOutputInterface, onJoinOutput}
