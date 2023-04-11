'use client'
import {type ReactNode, useEffect, useRef} from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'

import {CURRENT_USER_QUERY_KEY, CurrentUser} from '@app/services/current-user'

const queryClient = new QueryClient()

const StorageProvider = ({
  children,
  currentUser,
}: {
  children: ReactNode
  currentUser: CurrentUser | null
}) => {
  const previousCurrentUserRef = useRef<CurrentUser>()
  if (previousCurrentUserRef.current !== currentUser) {
    queryClient.setQueryData(CURRENT_USER_QUERY_KEY, currentUser)
    previousCurrentUserRef.current = currentUser
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export {StorageProvider, queryClient}
export * from 'react-query'
