import {z} from 'zod'

const getRoomMessagesInput = z.object({
  id: z.string(),
})

type GetRoomInputInterface = z.infer<typeof getRoomMessagesInput>

export {getRoomMessagesInput}
export type {GetRoomInputInterface}
