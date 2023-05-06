import {headers} from 'next/headers'
import {redirect} from 'next/navigation'

import {
  createArchivistClient,
  createPassportClient,
  type ClientOptions,
  getHeaders,
} from '@app/library/services/api-clients'
import {MessagesProvider} from '@app/room/providers/messages'

import {MessageInput} from './message-input'
import {Messages} from './messages'

export default async function LiveRoom({
  params: {url},
}: {
  params: {url: string}
}) {
  const options: ClientOptions = {
    headers: getHeaders(headers()),
  }

  const user = await createPassportClient(options).currentUser.query()
  if (!user) {
    return redirect('/')
  }

  const room = await createArchivistClient(options).findRoom.query({url})
  if (!room) {
    return redirect('/')
  }

  return (
    <>
      <article>
        <h1>{room.name ?? room.url}</h1>
        <h2>Welcome {user.username}</h2>
      </article>
      <MessagesProvider messages={room.messages}>
        <Messages room={room} />
        <MessageInput roomId={room.id} />
      </MessagesProvider>
    </>
  )
}
