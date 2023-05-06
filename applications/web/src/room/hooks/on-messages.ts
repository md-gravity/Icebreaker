import {useEffect} from 'react'

import {MessageDtoInterface} from '@packages/dtos'

import {getTelegraphConnector} from '@app/library/services/api-clients'

const useOnMessage = ({
  url,
  onMessage,
}: {
  url: string
  onMessage: (event: MessageDtoInterface) => void
}) => {
  useEffect(() => {
    const {unsubscribe} = getTelegraphConnector().client.onMessage.subscribe(
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
  }, [onMessage, url])
}

export {useOnMessage}
