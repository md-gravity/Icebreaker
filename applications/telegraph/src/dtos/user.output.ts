import {z} from 'zod'

const userOutput = z.object({
  email: z.string(),
  id: z.number(),
  temporal: z.boolean(),
  username: z.string(),
})

type UserOutput = z.infer<typeof userOutput>

export {type UserOutput, userOutput}
