enum EventTypes {
  CreateUser = 'createUser',
  CreateRoom = 'createRoom',
}

interface BaseEvent {
  type: EventTypes
  data: unknown
}

export {EventTypes}
export type {BaseEvent}
