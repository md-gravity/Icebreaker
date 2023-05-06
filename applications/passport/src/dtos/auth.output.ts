import {z} from 'zod'

import {userDto} from '@packages/dtos'

const authOutput = z.object({
  user: userDto,
})

type AuthOutputInterface = z.infer<typeof authOutput>

export {type AuthOutputInterface, authOutput}
