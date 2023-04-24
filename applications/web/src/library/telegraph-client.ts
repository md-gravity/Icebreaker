'use client'

import {type RoomRouter} from '@applications/telegraph'
import {createTRPCProxyClient, createWSClient, wsLink} from '@trpc/client'

import {API_URL} from '@app/library/api-client.server'

const socketsMap = new Map<string, ReturnType<typeof getTelegraphClient>>()

const GUUID = 'GUUID'

const getTelegraphClient = (guid: string = GUUID) => {
  if (socketsMap.has(guid)) {
    return socketsMap.get(guid)
  }

  const client = createWSClient({
    url: `${API_URL.replace('http', 'ws')}/api/telegraph`,
  })
  const trpc = createTRPCProxyClient<RoomRouter>({
    links: [
      wsLink<RoomRouter>({
        client,
      }),
    ],
  })

  socketsMap.set(guid, {client, trpc})

  return {client, trpc}
}

export {getTelegraphClient}
