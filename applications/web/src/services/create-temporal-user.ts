import {passportClient} from '@app/library/passport-client'
import {useMutation} from '@app/library/storage'
import {createJWTCookie} from '@app/services/jwt'

const useCreateTemporalUser = () =>
  useMutation(
    async (variables: {username: string}) =>
      passportClient.createTemporalUser.mutate(variables),
    {
      onSuccess: (data) => {
        createJWTCookie(data.token)
      },
    }
  )

export {useCreateTemporalUser}
