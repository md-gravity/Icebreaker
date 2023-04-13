import {createClient as createArchivist} from '@applications/archivist'
import {createClient as createPassport} from '@applications/passport'

let API_URL

if (typeof window === 'undefined') {
  API_URL = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
} else {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined')
  }
  API_URL = process.env.NEXT_PUBLIC_API_URL
}

const archivistClient = createArchivist(`${API_URL}/api/archivist`, getHeaders)
const passportClient = createPassport(`${API_URL}/api/passport`, getHeaders)

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

export {archivistClient, passportClient}
