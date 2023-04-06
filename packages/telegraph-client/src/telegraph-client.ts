import {createTRPCProxyClient, createWSClient, wsLink} from '@trpc/client'

import type {RoomRouter} from '@applications/telegraph'
import type {} from '@packages/telegraph-db'
import type {} from '@packages/authentication'

const createTelegraphClient = (url: string) => {
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

export {createTelegraphClient}
