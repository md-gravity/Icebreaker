import {z} from 'zod'

const roomSubscriptionInput = z.object({
  roomId: z.number(),
})

type RoomSubscriptionInput = z.infer<typeof roomSubscriptionInput>

export {roomSubscriptionInput}
export type {RoomSubscriptionInput}
