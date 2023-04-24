'use client'

import {type MessageDtoInterface} from '@packages/dtos'
import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useState,
} from 'react'

const MessagesContext = createContext<ReturnType<
  typeof useMessagesState
> | null>(null)

type MessagesProviderComponent = FC<{
  messages: MessageDtoInterface[]
}>

type MessageProviderComponent = FC<{
  messages: MessageDtoInterface[]
  children: ReactNode
}>

function useMessagesState(messages: MessageDtoInterface[]) {
  return useState(messages)
}

const MessagesProvider: MessageProviderComponent = ({messages, children}) => {
  const ctx = useMessagesState(messages)
  return (
    <MessagesContext.Provider value={ctx}>{children}</MessagesContext.Provider>
  )
}

const useMessages = () => {
  const ctx = useContext(MessagesContext)

  if (!ctx) {
    throw new Error('useMessages must be used within a MessagesProvider')
  }

  return ctx
}

export {MessagesProvider, useMessages}
