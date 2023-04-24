'use client'
import {passportClient} from '@app/library/api-client.browser'
import {useMutation} from '@app/library/storage'

const useCreateTemporalUser = () =>
  useMutation(passportClient.createTemporalUser.mutate)

export {useCreateTemporalUser}
