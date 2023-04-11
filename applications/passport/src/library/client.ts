import {type PassportRouter} from '@app/handler'
import {createTRPCProxyClient, httpLink} from '@trpc/client'

const createClient = (
  url: string,
  getCustomHeaders?: () =>
    | Record<string, string>
    | Promise<Record<string, string>>
) =>
  createTRPCProxyClient<PassportRouter>({
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
