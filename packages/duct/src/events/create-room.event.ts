import {createEvent} from '../create-event'
import {EventTypes} from './event'

interface CreateRoomEvent {
  type: EventTypes.CreateRoom
  data: {
    id: number
    url: string
    name?: string | null
  }
}

const createRoomEvent = createEvent<CreateRoomEvent>(EventTypes.CreateRoom)

export {createRoomEvent}
export type {CreateRoomEvent}
