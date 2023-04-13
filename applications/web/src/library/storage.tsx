'use client'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  UseMutationOptions,
} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {type ReactNode, useRef} from 'react'

import {
  type CurrentUser,
  CURRENT_USER_QUERY_KEY,
} from '@app/services/current-user'

const queryClient = new QueryClient()

const QueryProvider = ({
  children,
  currentUser,
}: {
  children: ReactNode
  currentUser: CurrentUser | null
}) => {
  const previousCurrentUserRef = useRef<CurrentUser | null>(null)
  if (previousCurrentUserRef.current !== currentUser) {
    queryClient.setQueryData([CURRENT_USER_QUERY_KEY], {user: currentUser})
    previousCurrentUserRef.current = currentUser
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}

export {
  type UseMutationOptions,
  QueryProvider,
  queryClient,
  useQuery,
  useMutation,
  useQueryClient,
}
