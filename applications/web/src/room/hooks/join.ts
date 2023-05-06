import {useEffect} from 'react'

import {getTelegraphConnector} from '@app/library/services/api-clients'

const useJoin = ({
  url,
  onJoin,
}: {
  url: string
  onJoin: (event: {roomId: number; userId: number}) => void
}) => {
  useEffect(() => {
    getTelegraphConnector().client.join.mutate({url})
  }, [url])

  useEffect(() => {
    const {unsubscribe} = getTelegraphConnector().client.onJoin.subscribe(
      {url},
      {
        onData: (event) => {
          onJoin(event)
        },
      }
    )

    return () => {
      unsubscribe()
    }
  }, [onJoin, url])
}

export {useJoin}
