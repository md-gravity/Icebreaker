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
        headers: getCustomHeaders,
        url,
      }),
    ],
  })

export {createClient}
