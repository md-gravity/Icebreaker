import {createPassportClient} from '@packages/passport-client'
import {headers} from 'next/headers'

const INTERNAL_PASSPORT_API_URL = 'http://passport-cluster-ip-srv:3000'

const createPassportApi = () =>
  createPassportClient(INTERNAL_PASSPORT_API_URL, {
    Cookie: headers().get('cookie') ?? '',
  })

export {createPassportApi}
