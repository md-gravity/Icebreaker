import {EventTypes} from './event'
import {createEvent} from '../create-event'

interface CreateUserEvent {
  type: EventTypes.CreateUser
  data: {
    id: number
    email: string
    temporal: boolean
    username: string
  }
}

const createUserEvent = createEvent<CreateUserEvent>(EventTypes.CreateUser)

export {createUserEvent}
export type {CreateUserEvent}
