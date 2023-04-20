'use client'
import {type FormEvent, useEffect} from 'react'

import {archivistClient} from '@app/library/api-client'
import {telegraphClient} from '@app/library/telegraph-client'

interface FormControlsCollection extends HTMLFormControlsCollection {
  message: HTMLInputElement
}
interface HTMLRoomForm extends HTMLFormElement {
  readonly elements: FormControlsCollection
}

const LiveRoom = ({
  room,
}: {
  room: Awaited<ReturnType<typeof archivistClient.findRoomByUrl.query>>
}) => {
  const {url} = room
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

  useEffect(() => {
    const {unsubscribe} = telegraphClient.onMessage.subscribe(
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

  const handleSubmit = async (event: FormEvent<HTMLRoomForm>) => {
    event.preventDefault()

    const text = event.currentTarget.message.value
    const message = await archivistClient.createMessage.mutate({
      roomId: room.id,
      text,
    })
    telegraphClient.message.mutate(message)
  }

  return (
    <section>
      <h1>URL: {url}</h1>
      Connecting...
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Enter message</legend>
          <label htmlFor="message">Message:</label>
          <input
            id="message"
            name="message"
            type="text"
          />
        </fieldset>
      </form>
    </section>
  )
}

export {LiveRoom}
