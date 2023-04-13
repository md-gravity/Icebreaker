import {userOutput} from '@app/dtos/user.output'
import {z} from 'zod'

const authOutput = z.object({
  user: userOutput,
})

type AuthOutputInterface = z.infer<typeof authOutput>

export {type AuthOutputInterface, authOutput}
