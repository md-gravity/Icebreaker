import {headers} from 'next/headers'

import {RoomForm} from '@app/app/room-form'
import {UserForm} from '@app/app/user-form'
import {createPassportClient, getHeaders} from '@app/library/api-client.server'

export default async function Home() {
  const user = await createPassportClient({
    headers: getHeaders(headers()),
  }).currentUser.query()

  return (
    <>
      <UserForm currentUser={user} />
      <RoomForm />
    </>
  )
}
