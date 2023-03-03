import {createTemporalUserInput} from '@app/inputs/create-temporal-user.input'
import {signInInput} from '@app/inputs/sign-in-user.input'
import {signUpInput} from '@app/inputs/sign-up-user.input'
import {findTokenMiddleware} from '@app/services/authentication.service'
import {
  findUserByToken,
  signIn,
  signUp,
  temporalSignUp,
} from '@app/services/sign-user.service'
import {initTRPC} from '@trpc/server'

import type {Context} from '@app/lib/create-context'

const tRPC = initTRPC.context<Context>().create()
const {router, procedure, middleware} = tRPC

const findToken = middleware(findTokenMiddleware)

const passportRouter = router({
  createTemporalUser: procedure
    .input((body) => createTemporalUserInput.parse(body))
    .mutation(async ({input, ctx}) => {
      const {user, token} = await temporalSignUp(input)

      /**
       * TODO
       * Add secure property
       */
      ctx.res.setHeader('Set-Cookie', `token=${token}`)

      return user
    }),
  currentUser: procedure.use(findToken).query(async ({ctx}) => {
    const {jwt} = ctx
    if (!jwt) {
      return null
    }

    return findUserByToken(jwt.payload)
  }),
  signIn: procedure
    .input((body) => signInInput.parse(body))
    .mutation(async ({input, ctx}) => {
      const {user, token} = await signIn(input)

      /**
       * TODO
       * Add secure property
       */
      ctx.res.setHeader('Set-Cookie', `token=${token}`)

      return user
    }),
  signUp: procedure
    .input((body) => signUpInput.parse(body))
    .mutation(async ({input, ctx}) => {
      const {user, token} = await signUp(input)

      /**
       * TODO
       * Add secure property
       */
      ctx.res.setHeader('Set-Cookie', `token=${token}`)

      return user
    }),
})

type PassportRouter = typeof passportRouter

export {passportRouter}
export type {PassportRouter}
