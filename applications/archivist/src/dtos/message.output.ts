import {createMessageInput} from '@app/dtos/create-message.input'
import {roomOutput} from '@app/dtos/room.output'
import {z} from 'zod'

const messageOutput = z.object({
  id: z.number(),
  roomId: roomOutput.shape.id,
  text: createMessageInput.shape.text,
  userId: z.number(),
})

type MessageOutputInterface = z.infer<typeof messageOutput>

export {type MessageOutputInterface, messageOutput}
