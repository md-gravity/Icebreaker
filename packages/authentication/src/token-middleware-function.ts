import {
  type AnyRootConfig,
  type MiddlewareFunction,
  type ProcedureParams,
} from '@trpc/server'
import {type IncomingMessage} from 'node:http'

import {verify} from './jwt.service'
import {type Payload} from './jwt.service'

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

const retrieveCookieToken = (cookie: string) => {
  const TOKEN_REGEXP = /[=](?<jwt>.*)/u

  const cookieTokenItem = cookie.split(';').find((item) => item.includes('jwt'))
  return cookieTokenItem?.match(TOKEN_REGEXP)?.groups?.jwt ?? null
}

export {tokenMiddlewareFunction}
