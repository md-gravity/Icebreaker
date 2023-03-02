import {z} from 'zod'

const userInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  temporary: z.boolean(),
})

type UserInput = z.infer<typeof userInput>

export {userInput}
export type {UserInput}
