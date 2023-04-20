import {type MessageOutputInterface} from '@app/dtos/message.output'
import {getRoomEmitter} from '@app/library/room-emitter'

const EVENT = 'message'

const messageEmitter = {
  emit(targetRoomUrl: string, message: MessageOutputInterface) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.emit(EVENT, message)
  },
  off(
    targetRoomUrl: string,
    callback: (message: MessageOutputInterface) => void
  ) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.off(EVENT, callback)
  },
  on(
    targetRoomUrl: string,
    callback: (message: MessageOutputInterface) => void
  ) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.on(EVENT, callback)
  },
}

export {messageEmitter}
