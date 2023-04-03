import {inferAsyncReturnType} from '@trpc/server'

import type {CreateWSSContextFnOptions} from '@trpc/server/adapters/ws'

function createContext({req, res}: CreateWSSContextFnOptions) {
  return {
    client: res,
    req,
  }
}
type Context = inferAsyncReturnType<typeof createContext>

export {createContext}
export type {Context}
