import {z} from 'zod'

import {roomOutput} from '@app/dtos/room.output'

const joinInput = z.object({
  url: roomOutput.shape.url,
})

type JoinInputInterface = z.infer<typeof joinInput>

export {type JoinInputInterface, joinInput}
