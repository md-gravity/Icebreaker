'use client'
import {createContext, useState, useContext, useEffect} from 'react'

import {passportClient} from '../lib/passport.client'

import type {ReactNode} from 'react'

type User = Awaited<ReturnType<typeof passportClient.signIn.mutate>> &
  Awaited<ReturnType<typeof passportClient.signUp.mutate>> &
  Awaited<ReturnType<typeof passportClient.createTemporalUser.mutate>>

const UserContext = createContext<ReturnType<typeof useUserContext>>(null)

const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    effect()

    async function effect() {
      setUser(await passportClient.currentUser.query())
    }
  }, [])
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('UserContext is not initialized')
  return ctx
}

export {useUserContext, UserProvider}
export type {User}
