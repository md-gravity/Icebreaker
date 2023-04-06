import {CreateRoom} from '@app/components/create-room'
import {UsernameClient} from '@app/components/username.client'

export default function Home() {
  return (
    <main>
      <UsernameClient />
      <CreateRoom />
    </main>
  )
}
