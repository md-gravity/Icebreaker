import {passportClient} from '@app/library/passport-client'
import {useQuery} from '@app/library/storage'

type CurrentUser = ReturnType<typeof useCurrentUserQuery>['data']

const CURRENT_USER_QUERY_KEY = 'currentUser'

const useCurrentUserQuery = () =>
  useQuery(
    CURRENT_USER_QUERY_KEY,
    async () => {
      const {user} = await passportClient.currentUser.query()
      return user
    },
    {refetchOnMount: false}
  )

export {type CurrentUser, useCurrentUserQuery, CURRENT_USER_QUERY_KEY}
