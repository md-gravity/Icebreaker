import {createEvent} from '../create-event'
import {EventTypes} from './event'

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
