import {createTRPCProxyClient, httpLink} from '@trpc/client'

import type {PassportRouter} from '@applications/passport'

const createPassportClient = (
  url: string,
  customHeaders?: {[key: string]: string}
) =>
  createTRPCProxyClient<PassportRouter>({
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

export {createPassportClient}
