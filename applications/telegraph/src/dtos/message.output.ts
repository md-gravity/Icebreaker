import {messageInput} from '@app/dtos/message.input'
import {roomOutput} from '@app/dtos/room.output'
import {userOutput} from '@app/dtos/user.output'
import {z} from 'zod'

const messageOutput = z.object({
  id: messageInput.shape.id,
  roomId: roomOutput.shape.id,
  text: messageInput.shape.text,
  userId: userOutput.shape.id,
})

type MessageOutputInterface = z.infer<typeof messageOutput>

export {type MessageOutputInterface, messageOutput}
