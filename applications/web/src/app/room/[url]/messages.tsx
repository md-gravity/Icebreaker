'use client'
import React from 'react'

import {RoomDtoInterface} from '@packages/dtos'

import {useJoin} from '@app/room/hooks/join'
import {useOnMessage} from '@app/room/hooks/on-messages'
import {useMessages} from '@app/room/providers/messages'

type MessagesListComponent = React.FC<{
  room: RoomDtoInterface
}>

const Messages: MessagesListComponent = ({room}) => {
  const {url} = room

  const [messages, setMessages] = useMessages()

  useOnMessage({
    onMessage: (event) => setMessages((cache) => [...cache, event]),
    url,
  })

  useJoin({onJoin: console.log, url})

  return (
    <section>
      {messages.map((message) => (
        <div key={message.id}>
          <div>
            <b>{message.user.username}</b>
          </div>
          <div>{message.text}</div>
        </div>
      ))}
    </section>
  )
}
export {Messages}
