import {userOutput} from '@app/dtos/user.output'
import {z} from 'zod'

const currentUserOutput = z.object({
  user: userOutput.nullable(),
})

type CurrentUserOutputInterface = z.infer<typeof currentUserOutput>

export {type CurrentUserOutputInterface, currentUserOutput}
