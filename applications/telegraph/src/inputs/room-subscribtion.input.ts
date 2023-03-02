import {userInput} from '@app/inputs/user.input'
import {z} from 'zod'

const roomSubscriptionInput = z.object({
  roomId: z.string(),
  user: userInput,
})

type RoomSubscriptionInput = z.infer<typeof roomSubscriptionInput>

export {roomSubscriptionInput}
export type {RoomSubscriptionInput}
