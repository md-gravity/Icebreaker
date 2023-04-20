import {userOutput} from '@app/dtos/user.output'
import {
  connectDuct as connect,
  type UserCreatedEvent,
  userCreatedEvent,
  getNATSClient,
} from '@packages/duct'

const connectDuct = async () => connect()

const emitUserCreated = async (user: UserCreatedEvent['data']) =>
  userCreatedEvent(getNATSClient().client).publish(userOutput.parse(user))

export {connectDuct, emitUserCreated}
