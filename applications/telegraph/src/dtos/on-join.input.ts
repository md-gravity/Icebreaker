import {joinInput} from '@app/dtos/join.input'
import {z} from 'zod'

const onJoinInput = joinInput.pick({url: true})

type OnJoinInputInterface = z.infer<typeof onJoinInput>

export {type OnJoinInputInterface, onJoinInput}
