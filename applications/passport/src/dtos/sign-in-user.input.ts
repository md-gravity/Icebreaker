import {userDto} from '@packages/dtos'
import {z} from 'zod'

const signInInput = userDto
  .pick({
    email: true,
  })
  .extend({
    password: z.string(),
  })

type SignInInputInterface = z.infer<typeof signInInput>

export {type SignInInputInterface, signInInput}
