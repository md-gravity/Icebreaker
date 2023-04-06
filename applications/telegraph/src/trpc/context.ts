import {inferAsyncReturnType} from '@trpc/server'

import type {CreateWSSContextFnOptions} from '@trpc/server/adapters/ws'

function createContext({req}: CreateWSSContextFnOptions) {
  return {
    req,
  }
}
type Context = inferAsyncReturnType<typeof createContext>

export {createContext}
export type {Context}
