import {tokenOutput} from '@app/dtos/token.output'
import {userOutput} from '@app/dtos/user.output'
import {z} from 'zod'

const authOutput = z.object({
  token: tokenOutput,
  user: userOutput,
})

type AuthOutputInterface = z.infer<typeof authOutput>

export {type AuthOutputInterface, authOutput}
