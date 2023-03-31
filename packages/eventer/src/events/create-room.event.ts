import {createEventer} from '../lib/create-eventer'
import {EventTypes} from './event'

interface CreateRoomEvent {
  type: EventTypes.CreateRoom
  data: {
    id: number
    url: string
    name?: string | null
  }
}

const createRoomEventer = createEventer<CreateRoomEvent>(EventTypes.CreateRoom)

export {createRoomEventer}
export type {CreateRoomEvent}
