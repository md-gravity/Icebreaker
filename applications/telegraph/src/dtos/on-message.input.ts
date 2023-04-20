import {joinInput} from '@app/dtos/join.input'
import {z} from 'zod'

const onMessageInput = joinInput.pick({url: true})

type onMessageInputInterface = z.infer<typeof onMessageInput>

export {type onMessageInputInterface, onMessageInput}
