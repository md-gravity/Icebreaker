import {userDto} from '@packages/dtos'
import {
  connectDuct as connect,
  type UserCreatedEvent,
  userCreatedEvent,
  getNATSClient,
} from '@packages/duct'

const connectDuct = async () => connect()

const emitUserCreated = async (user: UserCreatedEvent['data']) =>
  userCreatedEvent(getNATSClient().client).publish(userDto.parse(user))

export {connectDuct, emitUserCreated}
