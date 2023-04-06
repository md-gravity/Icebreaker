import {createPassportClient} from '@packages/passport-client'

if (!process.env.NEXT_PUBLIC_PASSPORT_API_URL) {
  throw new Error('NEXT_PUBLIC_PASSPORT_API_URL is not defined')
}

const passportClient = createPassportClient(
  process.env.NEXT_PUBLIC_PASSPORT_API_URL
)

export {passportClient}
