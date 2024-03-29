import {type OnJoinOutputInterface} from '@app/dtos/on-join.output'
import {getRoomEmitter} from '@app/library/room-emitter'

const EVENT = 'join'

const joinEmitter = {
  emit(targetRoomUrl: string, message: OnJoinOutputInterface) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.emit(EVENT, message)
  },
  off(
    targetRoomUrl: string,
    callback: (message: OnJoinOutputInterface) => void
  ) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.off(EVENT, callback)
  },
  on(
    targetRoomUrl: string,
    callback: (message: OnJoinOutputInterface) => void
  ) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.on(EVENT, callback)
  },
}

export {joinEmitter}
