import {createTRPCProxyClient, createWSClient, wsLink} from '@trpc/client'

import type {RoomRouter} from '@applications/telegraph'

const createTelegraphClient = (url: string) => {
  const client = createWSClient({
    url,
  })

  return createTRPCProxyClient<RoomRouter>({
    links: [
      wsLink({
        client,
      }),
    ],
  })
}

export {createTelegraphClient}
