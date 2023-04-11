import {EventEmitter} from 'node:events'

const roomsEmitter = new Map<string, EventEmitter>()

const getRoomEmitter = (roomUrl: string) => {
  if (!roomsEmitter.has(roomUrl)) {
    roomsEmitter.set(roomUrl, new EventEmitter())
  }

  return roomsEmitter.get(roomUrl)!
}

export {getRoomEmitter}
