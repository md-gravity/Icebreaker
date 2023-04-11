'use client'
import {type ReactNode, createContext, useContext, useState} from 'react'

type CurrentUser = {
  id: number
  username: string
  email: string
  temporal: boolean
}

const useUser = (initialState: CurrentUser | null) =>
  useState<CurrentUser | null>(initialState)

const UserContext = createContext<ReturnType<typeof useUser> | null>(null)

const CurrentUserProvider = ({
  user,
  children,
}: {
  children: ReactNode
  user: CurrentUser | null
}) => {
  const ctx = useUser(user)
  return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>
}

const useCurrentUser = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('UserContext is not initialized')
  return ctx
}

export {type CurrentUser, useCurrentUser, CurrentUserProvider}
