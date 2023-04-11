enum EventTypes {
  CreateUser = 'createUser',
  CreateRoom = 'createRoom',
}

interface BaseEvent {
  type: EventTypes
  data: unknown
}

export {type BaseEvent, EventTypes}
