import {roomOutput} from '@app/dtos/room.output'
import {userOutput} from '@app/dtos/user.output'
import {z} from 'zod'

const onJoinOutput = z.object({
  sender: userOutput,
  targetRoom: roomOutput,
})

type OnJoinOutputInterface = z.infer<typeof onJoinOutput>

export {type OnJoinOutputInterface, onJoinOutput}
