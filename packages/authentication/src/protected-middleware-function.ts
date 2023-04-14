import {
  type AnyRootConfig,
  type MiddlewareFunction,
  type ProcedureParams,
} from '@trpc/server'
import {type IncomingMessage} from 'node:http'

import {type Payload} from './jwt.service'

const protectedMiddlewareFunction: MiddlewareFunction<
  ProcedureParams<
    AnyRootConfig,
    {
      req: IncomingMessage
      jwt: Payload | null
    }
  >,
  ProcedureParams<
    AnyRootConfig,
    {
      req: IncomingMessage
      jwt: Payload
    }
  >
> = async ({ctx, next}) => {
  const {jwt} = ctx
  if (!jwt) {
    throw new Error('Unauthorized')
  }

  return next()
}

export {protectedMiddlewareFunction}
