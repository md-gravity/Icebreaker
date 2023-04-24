'use client'
import {type ArchivistRouter} from '@applications/archivist'
import {type PassportRouter} from '@applications/passport'
import {createTRPCProxyClient, httpLink} from '@trpc/client'

import {API_URL} from '@app/library/constants'

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
    url,
  }
}

export {API_URL, archivistClient, passportClient}
