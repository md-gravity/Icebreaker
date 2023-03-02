import {z} from 'zod'

const joinRoomInput = z.object({
  id: z.string().optional(),
  name: z.string(),
})

type JoinRoomInputInterface = z.infer<typeof joinRoomInput>

export {joinRoomInput}
export type {JoinRoomInputInterface}
