import {z} from 'zod'

const messageInput = z.object({
  id: z.number(),
  roomId: z.number(),
  text: z.string(),
})

type MessageInputInterface = z.infer<typeof messageInput>

export {type MessageInputInterface, messageInput}
