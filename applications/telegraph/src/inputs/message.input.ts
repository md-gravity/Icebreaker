import {z} from 'zod'

const messageInput = z.string()

type MessageInputInterface = z.infer<typeof messageInput>

export {messageInput}
export type {MessageInputInterface}
