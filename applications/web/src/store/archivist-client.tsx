'use client'
import {createArchivistClient} from '@packages/archivist-client'
import {createContext, useContext} from 'react'

if (!process.env.NEXT_PUBLIC_ARCHIVIST_API_URL) {
  throw new Error('NEXT_PUBLIC_ARCHIVIST_API_URL is not defined')
}

const client = createArchivistClient(process.env.NEXT_PUBLIC_ARCHIVIST_API_URL)

const ArchivistClientContext = createContext(client)

const ArchivistClientProvider = ({children}) => (
  <ArchivistClientContext.Provider value={client}>
    {children}
  </ArchivistClientContext.Provider>
)

const useArchivistClient = () => {
  const ctx = useContext(ArchivistClientContext)
  if (!ctx) throw new Error('ArchivistClientContext is not initialized')
  return ctx
}

export {useArchivistClient, ArchivistClientProvider}
