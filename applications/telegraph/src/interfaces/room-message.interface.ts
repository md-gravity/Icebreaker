import type {MessageInterface} from '@app/interfaces/message.interface'
import type {UserInterface} from '@app/interfaces/user.interface'

interface RoomMessageInterface {
  user: UserInterface
  text: MessageInterface
  roomId: string
}

export type {RoomMessageInterface}
