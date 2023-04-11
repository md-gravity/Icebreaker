import {z} from 'zod'

const roomOutput = z.object({
  id: z.number(),
  name: z.string().nullable(),
  url: z.string(),
})

type RoomOutput = z.infer<typeof roomOutput>

export {type RoomOutput, roomOutput}
