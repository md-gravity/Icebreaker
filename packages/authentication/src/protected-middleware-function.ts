import type {Payload} from './jwt.service'
import type {
  AnyRootConfig,
  MiddlewareFunction,
  ProcedureParams,
} from '@trpc/server'
import type {IncomingMessage} from 'node:http'

const protectedMiddlewareFunction: MiddlewareFunction<
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
  >,
  ProcedureParams<
    AnyRootConfig,
    {
      req: IncomingMessage
      jwt: Payload
    },
    unknown,
    unknown,
    unknown,
    unknown,
    unknown
  >
> = async ({ctx, next}) => {
  const {jwt} = ctx
  if (!jwt) {
    throw new Error('Unauthorized')
  }

  return next()
}

export {protectedMiddlewareFunction}
