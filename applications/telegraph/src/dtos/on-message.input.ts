import {roomDto} from '@packages/dtos'
import {z} from 'zod'

const onMessageInput = roomDto.pick({url: true})

type onMessageInputInterface = z.infer<typeof onMessageInput>

export {type onMessageInputInterface, onMessageInput}
