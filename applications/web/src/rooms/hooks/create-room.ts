'use client'

import {archivistClient} from '@app/library/api-client.browser'
import {type UseMutationOptions, useMutation} from '@app/library/storage'

type Data = Awaited<ReturnType<typeof archivistClient.createRoom.mutate>>
type Args = Parameters<typeof archivistClient.createRoom.mutate>

const useCreateRoom = ({
  ...options
}: UseMutationOptions<Data, unknown, Args[0]> = {}) =>
  useMutation(archivistClient.createRoom.mutate, options)

export {useCreateRoom}
