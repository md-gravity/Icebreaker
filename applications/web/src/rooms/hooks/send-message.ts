'use client'

import {type UseMutationOptions, useMutation} from '@app/library/storage'
import {getTelegraphClient} from '@app/library/telegraph-client'

type MessageMutation = ReturnType<
  typeof getTelegraphClient
>['trpc']['message']['mutate']

type Data = Awaited<ReturnType<MessageMutation>>
type Args = Parameters<MessageMutation>

const useSendMessage = ({
  ...options
}: UseMutationOptions<Data, unknown, Args[0]> = {}) =>
  useMutation({
    mutationFn: (args) => getTelegraphClient().trpc.message.mutate(args),
    ...options,
  })

export {useSendMessage}
