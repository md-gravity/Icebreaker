import {messageDto} from '@packages/dtos'
import {z} from 'zod'

const createMessageInput = messageDto.pick({
  roomId: true,
  text: true,
})

type CreateMessageInputInterface = z.infer<typeof createMessageInput>

export {type CreateMessageInputInterface, createMessageInput}
