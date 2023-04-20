import {z} from 'zod'

const createMessageInput = z.object({
  roomId: z.number(),
  text: z.string(),
})

type CreateMessageInputInterface = z.infer<typeof createMessageInput>

export {type CreateMessageInputInterface, createMessageInput}
