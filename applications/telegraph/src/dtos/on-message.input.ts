import {z} from 'zod'

import {roomDto} from '@packages/dtos'

const onMessageInput = roomDto.pick({url: true})

type onMessageInputInterface = z.infer<typeof onMessageInput>

export {type onMessageInputInterface, onMessageInput}
