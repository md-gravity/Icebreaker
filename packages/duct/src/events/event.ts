enum EventTypes {
  UserCreated = 'user:created',
  RoomCreated = 'room:created',
}

interface BaseEvent {
  type: EventTypes
  data: unknown
}

export {type BaseEvent, EventTypes}
