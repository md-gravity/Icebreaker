import {passportClient} from '@app/library/api-client'
import {useQuery} from '@app/library/storage'

type CurrentUser = Awaited<
  ReturnType<typeof passportClient.currentUser.query>
>['user']

const CURRENT_USER_QUERY_KEY = 'currentUser'

const useCurrentUserQuery = () =>
  useQuery({
    queryFn: () => passportClient.currentUser.query(),
    queryKey: [CURRENT_USER_QUERY_KEY],
    refetchOnMount: false,
  })

export {type CurrentUser, useCurrentUserQuery, CURRENT_USER_QUERY_KEY}
