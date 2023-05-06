import {headers} from 'next/headers'

import {RoomForm} from '@app/app/room-form'
import {UserForm} from '@app/app/user-form'
import {
  createPassportClient,
  getHeaders,
} from '@app/library/services/api-clients'

export default async function Home() {
  const user = await createPassportClient({
    headers: getHeaders(headers()),
  }).currentUser.query()

  return (
    <section className="flex justify-center items-center h-full">
      <article className="w-1/3  px-20 py-10 shadow-md">
        <UserForm currentUser={user} />
        <RoomForm />
      </article>
    </section>
  )
}
