import {AnyRootConfig, MiddlewareFunction, ProcedureParams} from '@trpc/server'
import {IncomingMessage} from 'node:http'

import {verify, Payload} from './jwt.service'
import {retrieveCookieToken} from './lib/retrieve-cookie-token'

const tokenMiddlewareFunction: MiddlewareFunction<
  ProcedureParams<
    AnyRootConfig,
    {req: IncomingMessage},
    unknown,
    unknown,
    unknown,
    unknown,
    unknown
  >,
  ProcedureParams<
    AnyRootConfig,
    {
      req: IncomingMessage
      jwt: null | Payload
    },
    unknown,
    unknown,
    unknown,
    unknown,
    unknown
  >
> = async ({ctx, next}) => {
  const {cookie} = ctx.req.headers
  const token = cookie ? await retrieveCookieToken(cookie) : null
  const jwt = token ? await verify(token) : null
  return next({
    ctx: {
      jwt,
    },
  })
}

export {tokenMiddlewareFunction}
