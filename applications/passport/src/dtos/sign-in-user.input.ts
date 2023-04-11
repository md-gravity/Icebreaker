import {z} from 'zod'

const signInInput = z.object({
  email: z.string(),
  password: z.string(),
})

type SignInInputInterface = z.infer<typeof signInInput>

export {type SignInInputInterface, signInInput}
