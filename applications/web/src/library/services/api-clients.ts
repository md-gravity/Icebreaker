import {type ArchivistRouter} from '@applications/archivist'
import {type PassportRouter} from '@applications/passport'
import {type RoomRouter} from '@applications/telegraph'
import {
  createTRPCProxyClient,
  createWSClient,
  httpLink,
  wsLink,
} from '@trpc/client'
import {CreateTRPCClientOptions} from '@trpc/client/src/createTRPCUntypedClient'
import {type AnyRouter} from '@trpc/server'
import {type ReadonlyHeaders} from 'next/dist/server/web/spec-extension/adapters/headers'

import {API_URL} from '@app/library/services/constants'

/**
 * HttpClient
 */

interface ClientOptions {
  headers: Record<string, string | undefined>
}

const createArchivistClient = (options?: ClientOptions) =>
  createTRPCProxyClient<ArchivistRouter>({
    links: [httpLink(getConfig(`${API_URL}/api/archivist`, options))],
  })

const createPassportClient = (options?: ClientOptions) =>
  createTRPCProxyClient<PassportRouter>({
    links: [httpLink(getConfig(`${API_URL}/api/passport`, options))],
  })

const archivistClient = createArchivistClient()
const passportClient = createPassportClient()

function getConfig(url: string, options?: ClientOptions) {
  return {
    fetch(origin, fetchOptions) {
      return fetch(origin, {
        ...fetchOptions,
        credentials: 'include',
      })
    },
    ...options,
    url,
  }
}

const getHeaders = (
  headers: ReadonlyHeaders
): Record<string, string | undefined> => Object.fromEntries(headers.entries())

/**
 * Websocket Client
 */

const DEFAULT_KEY = 'global'

const createWSConnector = <Router extends AnyRouter>(url: string) => {
  const sockets = new Map<
    string,
    ReturnType<typeof getWSConnector> | undefined
  >()

  function getWSConnector(guid = DEFAULT_KEY) {
    if (sockets.has(guid)) {
      return sockets.get(guid)
    }

    const socket = createWSClient({
      url,
    })

    const client = createTRPCProxyClient<Router>({
      links: [
        wsLink<Router>({
          client: socket,
        }),
      ],
    } as CreateTRPCClientOptions<Router>)

    sockets.set(guid, {client, socket})

    return {client, socket}
  }

  return getWSConnector
}

const getTelegraphConnector = createWSConnector<RoomRouter>(
  `${API_URL.replace('http', 'ws')}/api/telegraph`
)

export {
  archivistClient,
  createArchivistClient,
  createPassportClient,
  getHeaders,
  getTelegraphConnector,
  passportClient,
  type ClientOptions,
}
