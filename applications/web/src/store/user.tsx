'use client'
import {createContext, useContext, useState} from 'react'

import type {ReactNode} from 'react'

type User = {
  id: number
  username: string
  email: string
  temporal: boolean
}

const useUser = () => useState<User | null>(null)

const UserContext = createContext<ReturnType<typeof useUser> | null>(null)

const UserProvider = ({
  user,
  children,
}: {
  children: ReactNode
  user: User | null
}) => {
  const ctx = useState<User | null>(user)
  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>
}

const useUserContext = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('UserContext is not initialized')
  return ctx
}

export {useUserContext, UserProvider}
export type {User}
