'use client'
import {useEffect} from 'react'

import {telegraphClient} from '@app/library/telegraph-client'

const LiveRoom = ({url}: {url: string}) => {
  useEffect(() => {
    telegraphClient.join.mutate({url})

    const {unsubscribe} = telegraphClient.onJoin.subscribe(
      {url},
      {
        onData: (data) => {
          console.log('onData', data)
        },
      }
    )

    return () => {
      unsubscribe()
    }
  }, [url])

  return (
    <section>
      <h1>URL: {url}</h1>
      Connecting...
    </section>
  )
}

export {LiveRoom}
