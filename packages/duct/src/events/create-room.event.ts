import {EventTypes} from './event'
import {createEvent} from '../create-event'

interface CreateRoomEvent {
  type: EventTypes.CreateRoom
  data: {
    id: number
    url: string
    name?: string | null
  }
}

const createRoomEvent = createEvent<CreateRoomEvent>(EventTypes.CreateRoom)

export {type CreateRoomEvent, createRoomEvent}
