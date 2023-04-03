import {OnJoinRoomInputInterface} from '@app/inputs/on-join-room.input'
import {EventEmitter} from 'node:events'

enum Events {
  message = 'message',
}

const emitter = new EventEmitter()

function emitJoinRoom(message: OnJoinRoomInputInterface) {
  emitter.emit(Events.message, message)
}

function onJoinRoom(callback: (message: OnJoinRoomInputInterface) => void) {
  emitter.on(Events.message, callback)
}

function removeOnJoinRoom(
  callback: (message: OnJoinRoomInputInterface) => void
) {
  emitter.off(Events.message, callback)
}

export {emitter}

export {emitJoinRoom, onJoinRoom, removeOnJoinRoom}

export type {Events}
