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
import {type ReactNode} from 'react'

const queryClient = new QueryClient()

const QueryProviders = ({children}: {children: ReactNode}) => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    {children}
  </QueryClientProvider>
)

export {
  type UseMutationOptions,
  QueryProviders,
  queryClient,
  useQuery,
  useMutation,
  useQueryClient,
}
