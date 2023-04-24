'use client'
import {
  type UseMutationOptions,
  useMutation,
} from '@app/library/providers/query-provider'
import {archivistClient} from '@app/library/services/api-clients'

type Data = Awaited<ReturnType<typeof archivistClient.createMessage.mutate>>
type Args = Parameters<typeof archivistClient.createMessage.mutate>

const useCreateMessage = ({
  ...options
}: UseMutationOptions<Data, unknown, Args[0]> = {}) =>
  useMutation(archivistClient.createMessage.mutate, options)

export {useCreateMessage}
