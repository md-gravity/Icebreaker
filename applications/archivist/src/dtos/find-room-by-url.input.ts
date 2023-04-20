import {z} from 'zod'

const findRoomByUrlInput = z.object({
  url: z.string(),
})

type FindRoomByUrlInput = z.infer<typeof findRoomByUrlInput>

export {type FindRoomByUrlInput, findRoomByUrlInput}
