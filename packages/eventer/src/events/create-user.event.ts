import {createEventer} from '../lib/create-eventer'
import {EventTypes} from './event'

interface CreateUserEvent {
  type: EventTypes.CreateUser
  data: {
    id: number
    email: string
    temporal: boolean
    username: string
  }
}

const createUserEventer = createEventer<CreateUserEvent>(EventTypes.CreateUser)

export {createUserEventer}
export type {CreateUserEvent}
