'use client'
import {createClient} from '@applications/passport'

if (!process.env.NEXT_PUBLIC_PASSPORT_API_URL) {
  throw new Error('NEXT_PUBLIC_PASSPORT_API_URL is not defined')
}

const passportClient = createClient(process.env.NEXT_PUBLIC_PASSPORT_API_URL)

export {passportClient}
