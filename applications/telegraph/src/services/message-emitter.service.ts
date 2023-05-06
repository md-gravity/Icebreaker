import {MessageDtoInterface} from '@packages/dtos'

import {getRoomEmitter} from '@app/library/room-emitter'

const EVENT = 'message'

const messageEmitter = {
  emit(targetRoomUrl: string, message: MessageDtoInterface) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.emit(EVENT, message)
  },
  off(targetRoomUrl: string, callback: (message: MessageDtoInterface) => void) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.off(EVENT, callback)
  },
  on(targetRoomUrl: string, callback: (message: MessageDtoInterface) => void) {
    const emitter = getRoomEmitter(targetRoomUrl)
    emitter.on(EVENT, callback)
  },
}

export {messageEmitter}
