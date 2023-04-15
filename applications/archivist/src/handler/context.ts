import {inferAsyncReturnType} from '@trpc/server'
import {type CreateHTTPContextOptions} from '@trpc/server/adapters/standalone'

type Context = inferAsyncReturnType<typeof createContext>

function createContext({req, res}: CreateHTTPContextOptions) {
  return {
    req,
    res,
  }
}

export {type Context, createContext}
