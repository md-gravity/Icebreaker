import {type OnJoinOutputInterface} from '@app/dtos/on-join.output'
import {getRoomEmitter} from '@app/library/room-emitter'

const JOIN_EVENT = 'join'

const joinEmitter = {
  emit(targetRoomUrl: string, message: OnJoinOutputInterface) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.emit(JOIN_EVENT, message)
  },
  off(
    targetRoomUrl: string,
    callback: (message: OnJoinOutputInterface) => void
  ) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.off(JOIN_EVENT, callback)
  },
  on(
    targetRoomUrl: string,
    callback: (message: OnJoinOutputInterface) => void
  ) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.on(JOIN_EVENT, callback)
  },
}

export {joinEmitter}
