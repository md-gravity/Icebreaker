import {z} from 'zod'

const joinInput = z.object({
  url: z.string(),
})

type JoinInputInterface = z.infer<typeof joinInput>

export {type JoinInputInterface, joinInput}
