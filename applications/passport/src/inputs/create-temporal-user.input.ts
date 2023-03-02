import {z} from 'zod'

const createTemporalUserInput = z.object({
  username: z.string(),
})

type CreateTemporalUserInputInterface = z.infer<typeof createTemporalUserInput>

export {createTemporalUserInput}
export type {CreateTemporalUserInputInterface}
