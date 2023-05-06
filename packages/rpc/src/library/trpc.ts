import {initTRPC} from '@trpc/server'

import {retrieveCookieToken, verify} from '@packages/authentication'

import {type Context} from './context'

const tRPC = initTRPC.context<Context>().create()
const {router, procedure, middleware} = tRPC

const tokenMiddleware = middleware(async ({ctx, next}) => {
  const {cookie} = ctx.req.headers
  const token = cookie ? await retrieveCookieToken(cookie) : null
  const jwt = token ? await verify(token) : null

  return next({
    ctx: {
      jwt,
    },
  })
})

const protectedMiddleware = tokenMiddleware.unstable_pipe(
  async ({ctx, next}) => {
    const {jwt} = ctx
    if (!jwt) {
      throw new Error('Unauthorized')
    }

    return next({
      ctx: {
        /*
         * tRPC don't understand that jwt is not null after check
         * and return type from previous middleware.
         * So we need to return jwt manually to get not null type.
         */
        jwt,
      },
    })
  }
)

const tokenProcedure = procedure.use(tokenMiddleware)
const protectedProcedure = procedure.use(protectedMiddleware)

export {router, procedure, middleware, tokenProcedure, protectedProcedure}
