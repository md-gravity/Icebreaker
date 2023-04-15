import {userOutput} from '@app/dtos/user.output'
import {
  connectDuct as connect,
  CreateUserEvent,
  createUserEvent,
  getNATSClient,
} from '@packages/duct'

const connectDuct = async () => connect()

const emitUserCreated = async (user: CreateUserEvent['data']) =>
  createUserEvent(getNATSClient().client).publish(userOutput.parse(user))

export {connectDuct, emitUserCreated}
