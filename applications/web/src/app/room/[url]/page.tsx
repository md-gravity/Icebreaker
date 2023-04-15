import {LiveRoom} from '@app/app/room/[url]/live-room'

export default function RoomUrlPage({params: {url}}: {params: {url: string}}) {
  return <LiveRoom url={url} />
}
