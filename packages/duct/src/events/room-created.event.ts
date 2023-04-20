import {EventTypes} from './event'
import {createEvent} from '../create-event'

interface RoomCreatedEvent {
  type: EventTypes.RoomCreated
  data: {
    id: number
    url: string
    name?: string | null
  }
}

const roomCreatedEvent = createEvent<RoomCreatedEvent>(EventTypes.RoomCreated)

export {type RoomCreatedEvent, roomCreatedEvent}
