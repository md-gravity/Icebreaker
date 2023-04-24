'use client'

import {
  type UseMutationOptions,
  useMutation,
} from '@app/library/providers/query-provider'
import {getTelegraphConnector} from '@app/library/services/api-clients'

type MessageMutation = ReturnType<
  typeof getTelegraphConnector
>['trpc']['message']['mutate']

type Data = Awaited<ReturnType<MessageMutation>>
type Args = Parameters<MessageMutation>

const useSendMessage = ({
  ...options
}: UseMutationOptions<Data, unknown, Args[0]> = {}) =>
  useMutation({
    mutationFn: (args) => getTelegraphConnector().client.message.mutate(args),
    ...options,
  })

export {useSendMessage}
