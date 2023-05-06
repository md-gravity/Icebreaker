import {z} from 'zod'

import {messageDto} from '@packages/dtos'

const createMessageInput = messageDto.pick({
  roomId: true,
  text: true,
})

type CreateMessageInputInterface = z.infer<typeof createMessageInput>

export {type CreateMessageInputInterface, createMessageInput}
