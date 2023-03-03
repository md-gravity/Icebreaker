import {AnyRootConfig, MiddlewareFunction, ProcedureParams} from '@trpc/server'
import {IncomingMessage} from 'node:http'

import {createJwtService} from './jwt.service'

const createFindTokenMiddleware = <Payload>(
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
      jwt: null | Awaited<ReturnType<typeof jwtService.retrieveCookieToken>>
    },
    unknown,
    unknown,
    unknown,
    unknown,
    unknown
  >
> =>
  async function findTokenMiddleware({ctx, next}) {
    const {cookie} = ctx.req.headers
    /**
     * TODO
     * 1) catch invalid token, expired token
     */
    return next({
      ctx: {
        jwt: cookie ? await jwtService.retrieveCookieToken(cookie) : null,
      },
    })
  }

export {createFindTokenMiddleware}
