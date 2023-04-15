'use client'

import {type RoomRouter} from '@applications/telegraph'
import {createTRPCProxyClient, createWSClient, wsLink} from '@trpc/client'

import {API_URL} from '@app/library/api-client'

const client = createWSClient({
  url: `${API_URL.replace('http', 'ws')}/api/telegraph`,
})

const telegraphClient = createTRPCProxyClient<RoomRouter>({
  links: [
    wsLink<RoomRouter>({
      client,
    }),
  ],
})

export {telegraphClient}
