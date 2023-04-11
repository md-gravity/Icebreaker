import {createClient} from '@application/passport'

let PASSPORT_API_URL

if (typeof window === 'undefined') {
  PASSPORT_API_URL = 'http://passport-cluster-ip-srv:3000'
} else {
  if (!process.env.NEXT_PUBLIC_PASSPORT_API_URL) {
    throw new Error('NEXT_PUBLIC_PASSPORT_API_URL is not defined')
  }
  PASSPORT_API_URL = process.env.NEXT_PUBLIC_PASSPORT_API_URL
}

const passportClient = createClient(PASSPORT_API_URL, async () => {
  if (typeof window === 'undefined') {
    const {headers} = await import('next/headers')
    return {cookie: headers().get('cookie') ?? ''}
  }

  return {} as Record<string, string>
})

export {passportClient}
