import {getRoomEmitter} from '@app/lib/rooms-emitter.service'
import {Room, User} from '@packages/telegraph-db'

type JoinMessage = {
  sender: User
  targetRoom: Room
}

const JOIN_EVENT = 'join'

const joinEmitter = {
  emit(targetRoomUrl: string, message: JoinMessage) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.emit(JOIN_EVENT, message)
  },
  off(targetRoomUrl: string, callback: (message: JoinMessage) => void) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.off(JOIN_EVENT, callback)
  },
  on(targetRoomUrl: string, callback: (message: JoinMessage) => void) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.on(JOIN_EVENT, callback)
  },
}

export {joinEmitter}

export type {JoinMessage}
