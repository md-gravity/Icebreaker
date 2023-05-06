import {z} from 'zod'

import {userDto} from '@packages/dtos'

const createTemporalUserInput = userDto.pick({username: true})

type CreateTemporalUserInputInterface = z.infer<typeof createTemporalUserInput>

export {type CreateTemporalUserInputInterface, createTemporalUserInput}
