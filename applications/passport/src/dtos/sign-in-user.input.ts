import {z} from 'zod'

import {userDto} from '@packages/dtos'

const signInInput = userDto
  .pick({
    email: true,
  })
  .extend({
    password: z.string(),
  })

type SignInInputInterface = z.infer<typeof signInInput>

export {type SignInInputInterface, signInInput}
