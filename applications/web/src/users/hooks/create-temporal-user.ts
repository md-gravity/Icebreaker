'use client'
import {useMutation} from '@app/library/providers/query-provider'
import {passportClient} from '@app/library/services/api-clients'

const useCreateTemporalUser = () =>
  useMutation(passportClient.createTemporalUser.mutate)

export {useCreateTemporalUser}
