import {roomOutput} from '@app/dtos/room.output'
import {userOutput} from '@app/dtos/user.output'
import {z} from 'zod'

const onJoinOutput = z.object({
  roomId: roomOutput.shape.id,
  userId: userOutput.shape.id,
})

type OnJoinOutputInterface = z.infer<typeof onJoinOutput>

export {type OnJoinOutputInterface, onJoinOutput}
