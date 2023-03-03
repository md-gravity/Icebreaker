import {AnyRootConfig, MiddlewareFunction, ProcedureParams} from '@trpc/server'
import {IncomingMessage} from 'node:http'

import {createJwtService} from './jwt.service'
import {retrieveCookieToken} from './retrieve-cookie-token'

const createTokenMiddlewareFunction = <Payload>(
  jwtService: ReturnType<typeof createJwtService<Payload>>
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
      jwt: null | Awaited<ReturnType<typeof retrieveCookieToken>>
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
    /**
     * TODO
     * Catch invalid token, expired token
     */
    const token = cookie ? await retrieveCookieToken(cookie) : null
    const jwt = token ? await jwtService.verify(token) : null
    return next({
      ctx: {
        jwt,
      },
    })
  }

export {createTokenMiddlewareFunction}
