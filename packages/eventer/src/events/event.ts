enum EventTypes {
  CreateUser = 'createUser',
}

interface BaseEvent {
  type: EventTypes
  data: unknown
}

export {EventTypes}
export type {BaseEvent}
