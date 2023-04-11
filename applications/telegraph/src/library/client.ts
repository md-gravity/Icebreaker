import {type RoomRouter} from '@app/handler'
import {createTRPCProxyClient, createWSClient, wsLink} from '@trpc/client'

const createClient = (url: string) => {
  const client = createWSClient({
    url,
  })

  return createTRPCProxyClient<RoomRouter>({
    links: [
      wsLink<RoomRouter>({
        client,
      }),
    ],
  })
}

export {createClient}
