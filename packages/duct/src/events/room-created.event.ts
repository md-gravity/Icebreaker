import {createEvent} from '../create-event'

import {EventTypes} from './event'

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
