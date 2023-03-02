import {createTRPCProxyClient, httpLink} from '@trpc/client'

import type {PassportRouter} from '@applications/passport'

const createPassportClient = (url: string) => {
  const link = httpLink({
    url,
  })

  return createTRPCProxyClient<PassportRouter>({
    links: [link],
  })
}

export {createPassportClient}
