'use client'
import {createClient} from '@applications/passport'
import {createContext, useContext} from 'react'

if (!process.env.NEXT_PUBLIC_PASSPORT_API_URL) {
  throw new Error('NEXT_PUBLIC_PASSPORT_API_URL is not defined')
}

const client = createClient(process.env.NEXT_PUBLIC_PASSPORT_API_URL)

const PassportClientContext = createContext(client)

const PassportClientProvider = ({children}) => (
  <PassportClientContext.Provider value={client}>
    {children}
  </PassportClientContext.Provider>
)

const usePassportClient = () => {
  const ctx = useContext(PassportClientContext)
  if (!ctx) throw new Error('PassportClientContext is not initialized')
  return ctx
}

export {usePassportClient, PassportClientProvider}
