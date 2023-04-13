import {passportClient} from '@app/library/api-client'
import {useMutation} from '@app/library/storage'

const useCreateTemporalUser = () =>
  useMutation(passportClient.createTemporalUser.mutate)

export {useCreateTemporalUser}
