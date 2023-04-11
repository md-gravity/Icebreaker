import {createClient} from '@application/archivist'

if (!process.env.NEXT_PUBLIC_ARCHIVIST_API_URL) {
  throw new Error('NEXT_PUBLIC_ARCHIVIST_API_URL is not defined')
}

let ARCHIVIST_API_URL

if (typeof window === 'undefined') {
  ARCHIVIST_API_URL = 'http://archivist-cluster-ip-srv:3000'
} else {
  ARCHIVIST_API_URL = process.env.NEXT_PUBLIC_ARCHIVIST_API_URL
}

const archivistClient = createClient(ARCHIVIST_API_URL, async () => {
  if (typeof window === 'undefined') {
    const {headers} = await import('next/headers')
    return {cookie: headers().get('cookie') ?? ''}
  }

  return {} as Record<string, string>
})

export {archivistClient}
