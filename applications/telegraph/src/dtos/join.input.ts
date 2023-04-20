import {roomOutput} from '@app/dtos/room.output'
import {z} from 'zod'

const joinInput = z.object({
  url: roomOutput.shape.url,
})

type JoinInputInterface = z.infer<typeof joinInput>

export {type JoinInputInterface, joinInput}
