import {z} from 'zod'

const joinRoomInput = z.object({
  url: z.string(),
})

type JoinRoomInputInterface = z.infer<typeof joinRoomInput>

export {joinRoomInput}
export type {JoinRoomInputInterface}
