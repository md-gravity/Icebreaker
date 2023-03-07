import {inferAsyncReturnType} from '@trpc/server'

import type {CreateHTTPContextOptions} from '@trpc/server/dist/adapters/standalone'

type Context = inferAsyncReturnType<typeof createContext>

function createContext({req, res}: CreateHTTPContextOptions) {
  return {
    req,
    res,
  }
}

export {createContext}
export type {Context}
