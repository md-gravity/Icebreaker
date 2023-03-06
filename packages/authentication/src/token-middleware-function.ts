import {AnyRootConfig, MiddlewareFunction, ProcedureParams} from '@trpc/server'
import {IncomingMessage} from 'node:http'

import {createJwtService, Payload} from './jwt.service'
import {retrieveCookieToken} from './retrieve-cookie-token'

const createTokenMiddlewareFunction = (
  verify: ReturnType<typeof createJwtService>['verify']
): MiddlewareFunction<
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
> =>
  async function tokenMiddlewareFunction({ctx, next}) {
    const {cookie} = ctx.req.headers
    const token = cookie ? await retrieveCookieToken(cookie) : null
    const jwt = token ? await verify(token) : null
    return next({
      ctx: {
        jwt,
      },
    })
  }

export {createTokenMiddlewareFunction}
