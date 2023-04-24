'use client'
import React, {FormEvent} from 'react'

import {useCreateMessage} from '@app/room/hooks/create-message'
import {useSendMessage} from '@app/room/hooks/send-message'
import {useMessages} from '@app/room/providers/messages-provider'

interface FormControlsCollection extends HTMLFormControlsCollection {
  message: HTMLInputElement
}
interface HTMLRoomForm extends HTMLFormElement {
  readonly elements: FormControlsCollection
}

type MessageInputProps = React.FC<{
  roomId: number
}>

const MessageInput: MessageInputProps = ({roomId}) => {
  const [, setMessages] = useMessages()
  const sendMessage = useSendMessage()
  const createMessage = useCreateMessage({
    onSuccess: (message) => {
      setMessages((messages) => [...messages, message])
      sendMessage.mutate(message)
    },
  })

  const handleSubmit = async (event: FormEvent<HTMLRoomForm>) => {
    event.preventDefault()
    const text = event.currentTarget.message.value

    createMessage.mutate({
      roomId,
      text,
    })

    event.currentTarget.reset()
  }

  return (
    <section>
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
        <br />
        <button type="submit">Send</button>
      </form>
    </section>
  )
}
export {MessageInput}
