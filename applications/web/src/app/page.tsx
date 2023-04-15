import {RoomForm} from '@app/app/room-form'
import {UserForm} from '@app/app/user-form'

export default function Home() {
  return (
    <>
      <UserForm />
      <RoomForm />
    </>
  )
}

export const dynamic = 'force-dynamic'
