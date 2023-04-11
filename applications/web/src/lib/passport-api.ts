import {createClient} from '@applications/passport'

const INTERNAL_PASSPORT_API_URL = 'http://passport-cluster-ip-srv:3000'

const createPassportApi = createClient(INTERNAL_PASSPORT_API_URL, async () => {
  const {headers} = await import('next/headers')
  return {
    cookie: headers().get('cookie') ?? '',
  }
})

export {createPassportApi}
