import {messageInput} from '@app/inputs/message.input'
import {userInput} from '@app/inputs/user.input'
import {z} from 'zod'

const roomMessagesInput = z.object({
  roomId: z.string(),
  text: messageInput,
  user: userInput,
})

type RoomMessageInputInterface = z.infer<typeof roomMessagesInput>

export {roomMessagesInput}
export type {RoomMessageInputInterface}
