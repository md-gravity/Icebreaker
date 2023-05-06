import {retrieveCookieToken, verify} from '@packages/authentication'

import {middleware, procedure} from '../trpc'

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

const tokenProcedure = procedure.use(tokenMiddleware)

export {tokenMiddleware, tokenProcedure}
