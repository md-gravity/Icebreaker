import {userDto} from '@packages/dtos/build/user.dto'
import {z} from 'zod'

const signUpInput = userDto
  .pick({
    email: true,
    username: true,
  })
  .extend({password: z.string()})

type SignUpInputInterface = z.infer<typeof signUpInput>

export {type SignUpInputInterface, signUpInput}
