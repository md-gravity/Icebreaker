import {z} from 'zod'

const createRoomInput = z
  .object({
    name: z.string().optional(),
  })
  .optional()

type CreateRoomInput = z.infer<typeof createRoomInput>

export {type CreateRoomInput, createRoomInput}