import {type ArchivistRouter} from '@app/handler'
import {createTRPCProxyClient, httpLink} from '@trpc/client'

const createClient = (
  url: string,
  getCustomHeaders?: () =>
    | Record<string, string>
    | Promise<Record<string, string>>
) =>
  createTRPCProxyClient<ArchivistRouter>({
    links: [
      httpLink({
        fetch(origin, options) {
          return fetch(origin, {
            ...options,
            credentials: 'include',
          })
        },
        headers: getCustomHeaders,
        url,
      }),
    ],
  })

export {createClient}
