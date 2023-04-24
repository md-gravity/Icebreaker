import {MessageDtoInterface} from '@packages/dtos'
import {useEffect} from 'react'

import {useTelegraph} from '@app/room/providers/telegraph-provider'

const useOnMessage = ({
  url,
  onMessage,
}: {
  url: string
  onMessage: (event: MessageDtoInterface) => void
}) => {
  const {ready, client} = useTelegraph()

  console.log(ready)
  console.log(client)

  useEffect(() => {
    if (!ready) return

    const {unsubscribe} = client!.onMessage.subscribe(
      {url},
      {
        onData: (event) => {
          onMessage(event)
        },
      }
    )

    return () => {
      unsubscribe()
    }
  }, [ready, onMessage, url, client])
}

export {useOnMessage}
