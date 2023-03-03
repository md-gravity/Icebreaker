import {createTemporalUserInput} from '@app/inputs/create-temporal-user.input'
import {signInInput} from '@app/inputs/sign-in-user.input'
import {signUpInput} from '@app/inputs/sign-up-user.input'
import {
  findUserByToken,
  signIn,
  signUp,
  temporalSignUp,
} from '@app/services/sign-user.service'
import {procedure, router, tokenProcedure} from '@app/trpc/trpc'

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
  currentUser: tokenProcedure.query(async ({ctx}) => {
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
