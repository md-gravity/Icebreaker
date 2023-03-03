import {inferAsyncReturnType} from '@trpc/server'

import type {CreateHTTPContextOptions} from '@trpc/server/dist/adapters/standalone'

function createContext({req, res}: CreateHTTPContextOptions) {
  return {
    req,
    res,
  }
}
type Context = inferAsyncReturnType<typeof createContext>

export {createContext}
export type {Context}
