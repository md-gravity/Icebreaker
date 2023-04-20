import {EventTypes} from './event'
import {createEvent} from '../create-event'

interface UserCreatedEvent {
  type: EventTypes.UserCreated
  data: {
    id: number
    email: string
    temporal: boolean
    username: string
  }
}

const userCreatedEvent = createEvent<UserCreatedEvent>(EventTypes.UserCreated)

export {type UserCreatedEvent, userCreatedEvent}
