'use client'
import {archivistClient} from '@app/library/api-client.browser'
import {type UseMutationOptions, useMutation} from '@app/library/storage'

type Data = Awaited<ReturnType<typeof archivistClient.createMessage.mutate>>
type Args = Parameters<typeof archivistClient.createMessage.mutate>

const useCreateMessage = ({
  ...options
}: UseMutationOptions<Data, unknown, Args[0]> = {}) =>
  useMutation(archivistClient.createMessage.mutate, options)

export {useCreateMessage}
