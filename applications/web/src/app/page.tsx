import {RoomForm} from '@app/app/room-form'
import {UserForm} from '@app/app/user-form'

export default function Home() {
  return (
    <main>
      <UserForm />
      <RoomForm />
    </main>
  )
}
