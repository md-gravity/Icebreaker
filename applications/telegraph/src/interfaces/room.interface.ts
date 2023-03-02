import {RoomMessageInterface} from '@app/interfaces/room-message.interface'

interface RoomInterface {
  id: string
  name: string
  messages: RoomMessageInterface[]
}

export type {RoomInterface}
