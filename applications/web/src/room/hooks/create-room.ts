'use client'

import {
  type UseMutationOptions,
  useMutation,
} from '@app/library/providers/query-provider'
import {archivistClient} from '@app/library/services/api-clients'

type Data = Awaited<ReturnType<typeof archivistClient.createRoom.mutate>>
type Args = Parameters<typeof archivistClient.createRoom.mutate>

const useCreateRoom = ({
  ...options
}: UseMutationOptions<Data, unknown, Args[0]> = {}) =>
  useMutation(archivistClient.createRoom.mutate, options)

export {useCreateRoom}
