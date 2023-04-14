import {
  type AnyRootConfig,
  type MiddlewareFunction,
  type ProcedureParams,
} from '@trpc/server'
import {type IncomingMessage, type ServerResponse} from 'node:http'

import {type Payload, verify} from './jwt.service'

const tokenMiddlewareFunction: MiddlewareFunction<
  ProcedureParams<AnyRootConfig, {req: IncomingMessage}>,
  ProcedureParams<
    AnyRootConfig,
    {
      req: IncomingMessage
      jwt: Payload | null
    }
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

const DEFAULT_MAX_AGE = 24 * 60 * 60 * 1000

const setCookieToken = (token: string, res: ServerResponse) =>
  res.setHeader(
    'Set-Cookie',
    `jwt=${token}; Path=/; Max-Age=${DEFAULT_MAX_AGE}`
  )

export {tokenMiddlewareFunction, setCookieToken}
