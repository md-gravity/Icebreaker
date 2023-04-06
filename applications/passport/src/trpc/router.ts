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
import {createCookieToken} from '@packages/authentication'
import {createUserEvent, getNATSClient} from '@packages/duct'

const passportRouter = router({
  createTemporalUser: procedure
    .input((body) => createTemporalUserInput.parse(body))
    .mutation(async ({input, ctx}) => {
      const {
        user: {passwordHash, ...user},
        token,
      } = await temporalSignUp(input)

      await createUserEvent(getNATSClient().client).publish(user)

      ctx.res.setHeader('Set-Cookie', createCookieToken(token))

      return user
    }),
  currentUser: tokenProcedure.query(async ({ctx}) => {
    const {jwt} = ctx
    if (!jwt) {
      return null
    }

    return findUserByToken(jwt)
  }),
  signIn: procedure
    .input((body) => signInInput.parse(body))
    .mutation(async ({input, ctx}) => {
      const {user, token} = await signIn(input)

      ctx.res.setHeader('Set-Cookie', createCookieToken(token))

      return user
    }),
  signUp: procedure
    .input((body) => signUpInput.parse(body))
    .mutation(async ({input, ctx}) => {
      const {
        user: {passwordHash, ...user},
        token,
      } = await signUp(input)

      await createUserEvent(getNATSClient().client).publish(user)

      ctx.res.setHeader('Set-Cookie', createCookieToken(token))

      return user
    }),
})

type PassportRouter = typeof passportRouter

export {passportRouter}
export type {PassportRouter}
