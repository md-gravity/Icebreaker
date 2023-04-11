import {inferAsyncReturnType} from '@trpc/server'
import {type CreateWSSContextFnOptions} from '@trpc/server/adapters/ws'

function createContext({req}: CreateWSSContextFnOptions) {
  console.log(req)
  return {
    req,
  }
}
type Context = inferAsyncReturnType<typeof createContext>

export {type Context, createContext}
