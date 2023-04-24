import {userDto} from '@packages/dtos'
import {z} from 'zod'

const authOutput = z.object({
  user: userDto,
})

type AuthOutputInterface = z.infer<typeof authOutput>

export {type AuthOutputInterface, authOutput}
