import {userInput} from '@app/inputs/user.input'
import {z} from 'zod'

const onJoinRoomInput = z.object({
  roomId: z.number(),
  user: userInput,
})

type OnJoinRoomInputInterface = z.infer<typeof onJoinRoomInput>

export {onJoinRoomInput}
export type {OnJoinRoomInputInterface}
