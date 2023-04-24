import {type ArchivistRouter} from '@applications/archivist'
import {type PassportRouter} from '@applications/passport'
import {createTRPCProxyClient, httpLink} from '@trpc/client'
import {ReadonlyHeaders} from 'next/dist/server/web/spec-extension/adapters/headers'

import {API_URL} from '@app/library/constants'

interface ClientOptions {
  headers: Record<string, string | undefined>
}

const createArchivistClient = ({headers}: ClientOptions) =>
  createTRPCProxyClient<ArchivistRouter>({
    links: [
      httpLink({
        headers,
        url: `${API_URL}/api/archivist`,
      }),
    ],
  })

const createPassportClient = ({headers}: ClientOptions) =>
  createTRPCProxyClient<PassportRouter>({
    links: [
      httpLink({
        fetch(origin, options) {
          return fetch(origin, {
            ...options,
            credentials: 'include',
          })
        },
        headers,
        url: `${API_URL}/api/passport`,
      }),
    ],
  })

const getHeaders = (
  headers: ReadonlyHeaders
): Record<string, string | undefined> => Object.fromEntries(headers.entries())

export {
  API_URL,
  createArchivistClient,
  createPassportClient,
  getHeaders,
  type ClientOptions,
}
