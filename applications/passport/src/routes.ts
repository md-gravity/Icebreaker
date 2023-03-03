import {createTemporalUserInput} from '@app/inputs/create-temporal-user.input'
import {signInInput} from '@app/inputs/sign-in-user.input'
import {signUpInput} from '@app/inputs/sign-up-user.input'
import {
  currentUser,
  signIn,
  signUp,
  temporalSignUp,
} from '@app/services/sign-user.service'
import {initTRPC} from '@trpc/server'

import type {Context} from '@app/lib/create-context'

const tRPC = initTRPC.context<Context>().create()
const {router, procedure} = tRPC

const passportRouter = router({
  createTemporalUser: procedure
    .input((body) => createTemporalUserInput.parse(body))
    .mutation(async ({input, ctx}) => {
      const {user, token} = await temporalSignUp(input)

      ctx.res.setHeader('Set-Cookie', `token=${token}`)

      return user
    }),
  currentUser: procedure.query(async ({ctx}) => {
    const {cookie} = ctx.req.headers
    if (!cookie) {
      return null
    }

    return currentUser(cookie)
  }),
  signIn: procedure
    .input((body) => signInInput.parse(body))
    .mutation(async ({input, ctx}) => {
      const {user, token} = await signIn(input)

      ctx.res.setHeader('Set-Cookie', `token=${token}`)

      return user
    }),
  signUp: procedure
    .input((body) => signUpInput.parse(body))
    .mutation(async ({input, ctx}) => {
      const {user, token} = await signUp(input)

      ctx.res.setHeader('Set-Cookie', `token=${token}`)

      return user
    }),
})

type PassportRouter = typeof passportRouter

export {passportRouter}
export type {PassportRouter}
