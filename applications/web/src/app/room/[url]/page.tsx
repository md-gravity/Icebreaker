import {LiveRoom} from '@app/app/room/[url]/live-room'
import {archivistClient} from '@app/library/api-client'

export default async function RoomUrlPage({
  params: {url},
}: {
  params: {url: string}
}) {
  const room = await archivistClient.findRoomByUrl.query({url})

  return <LiveRoom room={room} />
}

export const dynamic = 'force-dynamic'
