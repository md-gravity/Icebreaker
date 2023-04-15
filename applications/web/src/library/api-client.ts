import {type ArchivistRouter} from '@applications/archivist'
import {type PassportRouter} from '@applications/passport'
import {createTRPCProxyClient, httpLink} from '@trpc/client'

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined')
}

const API_URL =
  typeof window === 'undefined'
    ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
    : process.env.NEXT_PUBLIC_API_URL

const archivistClient = createTRPCProxyClient<ArchivistRouter>({
  links: [httpLink(getConfig(`${API_URL}/api/archivist`))],
})
const passportClient = createTRPCProxyClient<PassportRouter>({
  links: [httpLink(getConfig(`${API_URL}/api/passport`))],
})

function getConfig(url: string) {
  return {
    fetch(origin, options) {
      return fetch(origin, {
        ...options,
        credentials: 'include',
      })
    },
    headers: getHeaders,
    url,
  }
}

async function getHeaders(): Promise<Record<string, string>> {
  if (typeof window === 'undefined') {
    const {headers} = await import('next/headers')
    return {
      cookie: headers().get('cookie') ?? '',
      host: headers().get('host') ?? '',
    }
  }

  return {}
}

export {API_URL, archivistClient, passportClient}
