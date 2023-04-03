import {z} from 'zod'

const userInput = z.object({
  email: z.string(),
  id: z.number(),
  temporal: z.boolean(),
  username: z.string(),
})

type UserInput = z.infer<typeof userInput>

export {userInput}
export type {UserInput}
