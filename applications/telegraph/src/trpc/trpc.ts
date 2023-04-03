import {Context} from '@app/trpc/context'
import {
  tokenMiddlewareFunction,
  protectedMiddlewareFunction,
} from '@packages/authentication'
import {initTRPC} from '@trpc/server'

const tRPC = initTRPC.context<Context>().create()
const {router, procedure, middleware} = tRPC

const tokenProcedure = procedure.use(tokenMiddlewareFunction)
const protectedProcedure = tokenProcedure.use(protectedMiddlewareFunction)

export {router, procedure, middleware}
export {tokenProcedure, protectedProcedure}
