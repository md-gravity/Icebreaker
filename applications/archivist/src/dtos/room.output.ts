import {z} from 'zod'

const roomOutput = z.object({
  id: z.number(),
  name: z.string().nullable(),
  url: z.string(),
})

type RoomOutputInterface = z.infer<typeof roomOutput>

export {type RoomOutputInterface, roomOutput}
