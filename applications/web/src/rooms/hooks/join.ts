import {useEffect} from 'react'

import {useTelegraph} from '@app/rooms/services/telegraph-provider'

const useJoin = ({
  url,
  onJoin,
}: {
  url: string
  onJoin: (event: {roomId: number; userId: number}) => void
}) => {
  const {ready, client} = useTelegraph()

  useEffect(() => {
    if (!ready) return

    client!.join.mutate({url})
  }, [ready, client, url])

  useEffect(() => {
    if (!ready) return

    const {unsubscribe} = client!.onJoin.subscribe(
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
  }, [onJoin, ready, client, url])
}

export {useJoin}
