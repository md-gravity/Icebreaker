import {createTRPCProxyClient, httpLink} from '@trpc/client'

import type {PassportRouter} from '@applications/passport'

const createPassportClient = (url: string) => {
  const link = httpLink({
    fetch(origin, options) {
      return fetch(origin, {
        ...options,
        credentials: 'include',
      })
    },
    url,
  })

  return createTRPCProxyClient<PassportRouter>({
    links: [link],
  })
}

export {createPassportClient}
