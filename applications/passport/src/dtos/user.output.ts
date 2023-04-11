import {z} from 'zod'

const userOutput = z.object({
  email: z.string(),
  id: z.number(),
  temporal: z.boolean(),
  username: z.string(),
})

type UserOutputInterface = z.infer<typeof userOutput>

export {type UserOutputInterface, userOutput}
