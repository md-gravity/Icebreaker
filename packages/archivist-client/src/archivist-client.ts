import {createTRPCProxyClient, httpLink} from '@trpc/client'

import type {ArchivistRouter} from '@applications/archivist'

const createArchivistClient = (
  url: string,
  customHeaders?: {[key: string]: string}
) =>
  createTRPCProxyClient<ArchivistRouter>({
    links: [
      httpLink({
        fetch(origin, options) {
          return fetch(origin, {
            ...options,
            credentials: 'include',
            headers: {
              ...options?.headers,
              ...customHeaders,
            },
          })
        },
        url,
      }),
    ],
  })

export {createArchivistClient}
