import {userDto} from '@packages/dtos'
import {z} from 'zod'

const createTemporalUserInput = userDto.pick({username: true})

type CreateTemporalUserInputInterface = z.infer<typeof createTemporalUserInput>

export {type CreateTemporalUserInputInterface, createTemporalUserInput}
