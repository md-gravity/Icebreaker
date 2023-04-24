'use client'
import {RoomRouter} from '@applications/telegraph'
import {createTRPCProxyClient, createWSClient, wsLink} from '@trpc/client'
import React, {createContext, ReactNode, useEffect, useRef} from 'react'

import {getTelegraphClient} from '@app/library/telegraph-client'

type TRPCClient = ReturnType<typeof createTRPCProxyClient<RoomRouter>>
type WSClient = ReturnType<typeof createWSClient>

const useTelegraphState = () => {
  const [mount, setMount] = React.useState(false)

  const wsClientRef = useRef<WSClient | null>(null)
  const trpcClientRef = useRef<TRPCClient | null>(null)

  const ready = mount && trpcClientRef.current

  useEffect(() => {
    const telegraph = getTelegraphClient()
    wsClientRef.current = telegraph.client
    trpcClientRef.current = telegraph.trpc

    setMount(true)

    return () => {
      wsClientRef.current!.close()
    }
  }, [])

  return {client: trpcClientRef.current, ready}
}

const Context = createContext<ReturnType<typeof useTelegraphState> | null>(null)

const TelegraphProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const telegraph = useTelegraphState()
  return <Context.Provider value={telegraph}>{children}</Context.Provider>
}

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
