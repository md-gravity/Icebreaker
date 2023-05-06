import {useEffect} from 'react'

import {MessageDtoInterface} from '@packages/dtos'

import {useTelegraph} from '@app/room/providers/telegraph'

const useOnMessage = ({
  url,
  onMessage,
}: {
  url: string
  onMessage: (event: MessageDtoInterface) => void
}) => {
  const {ready, client} = useTelegraph()

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
