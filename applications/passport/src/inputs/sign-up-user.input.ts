import {z} from 'zod'

const signUpInput = z.object({
  email: z.string(),
  password: z.string(),
  username: z.string(),
})

type SignUpInputInterface = z.infer<typeof signUpInput>

export {signUpInput}
export type {SignUpInputInterface}
