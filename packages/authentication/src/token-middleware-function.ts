import {verify} from './jwt.service'
import {cookieToken} from './lib/cookie-token'

import type {Payload} from './jwt.service'
import type {
  AnyRootConfig,
  MiddlewareFunction,
  ProcedureParams,
} from '@trpc/server'
import type {IncomingMessage} from 'node:http'

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
  const token = cookie ? await cookieToken(cookie) : null
  const jwt = token ? await verify(token) : null
  return next({
    ctx: {
      jwt,
    },
  })
}

export {tokenMiddlewareFunction}
