import {CreateRoom} from '@app/components/create-room'
import {UsernameClient} from '@app/components/username.client'
import {useUserContext} from '@app/store/user'

export default function Home() {
  return (
    <main>
      <UsernameClient />
      <CreateRoom />
    </main>
  )
}
