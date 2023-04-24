'use client'
import {RoomRouter} from '@applications/telegraph'
import {createTRPCProxyClient, createWSClient} from '@trpc/client'
import React, {createContext, ReactNode, useEffect, useRef} from 'react'

import {getTelegraphConnector} from '@app/library/services/api-clients'

type TRPCClient = ReturnType<typeof createTRPCProxyClient<RoomRouter>>
type WSClient = ReturnType<typeof createWSClient>

const useTelegraphState = () => {
  const [mount, setMount] = React.useState(false)

  const socketRef = useRef<WSClient | null>(null)
  const clientRef = useRef<TRPCClient | null>(null)

  const ready = Boolean(mount && socketRef.current && clientRef.current)

  useEffect(() => {
    const {socket, client} = getTelegraphConnector()
    socketRef.current = socket
    clientRef.current = client

    setMount(true)

    return () => {
      socket.getConnection().close()
    }
  }, [])

  return {client: clientRef.current, ready}
}

const Context = createContext<ReturnType<typeof useTelegraphState> | null>(null)

const TelegraphProvider: React.FC<{children: ReactNode}> = ({children}) => (
  <Context.Provider value={useTelegraphState()}>{children}</Context.Provider>
)

const useTelegraph = () => {
  const ctx = React.useContext(Context)

  if (!ctx) {
    throw new Error(
      'useTelegraphContext must be used within a TelegraphProvider'
    )
  }

  return ctx
}

export {useTelegraph, TelegraphProvider}
