import {procedure} from '../trpc'

import {tokenMiddleware} from './token.procedure'

const protectedMiddleware = tokenMiddleware.unstable_pipe(
  async ({ctx, next}) => {
    const {jwt} = ctx
    if (!jwt) {
      throw new Error('Unauthorized')
    }

    return next({
      ctx: {
        /*
         * tRPC don't understand that jwt is not null after check
         * and return type from previous middleware.
         * So we need to return jwt manually to get not null type.
         */
        jwt,
      },
    })
  }
)

const protectedProcedure = procedure.use(protectedMiddleware)

export {protectedMiddleware, protectedProcedure}
