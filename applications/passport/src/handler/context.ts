import {inferAsyncReturnType} from '@trpc/server'

import type {CreateHTTPContextOptions} from '@trpc/server/adapters/standalone'

function createContext({req, res}: CreateHTTPContextOptions) {
  return {
    req,
    res,
  }
}

type Context = inferAsyncReturnType<typeof createContext>

export {type Context, createContext}
