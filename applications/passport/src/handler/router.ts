import {authOutput} from '@app/dtos/auth.output'
import {createTemporalUserInput} from '@app/dtos/create-temporal-user.input'
import {currentUserOutput} from '@app/dtos/current-user.output'
import {signInInput} from '@app/dtos/sign-in-user.input'
import {signUpInput} from '@app/dtos/sign-up-user.input'
import {procedure, router, tokenProcedure} from '@app/handler/trpc'
import {
  findUserByToken,
  signIn,
  signUp,
  temporalSignUp,
} from '@app/services/sign-user.service'
import {setCookieToken} from '@packages/authentication'

const passportRouter = router({
  createTemporalUser: procedure
    .input((body) => createTemporalUserInput.parse(body))
    .output(authOutput)
    .mutation(async ({input, ctx}) => {
      const {user, token} = await temporalSignUp(input)

      setCookieToken(token, ctx.res)

      return {user}
    }),
  currentUser: tokenProcedure.output(currentUserOutput).query(async ({ctx}) => {
    const {jwt} = ctx
    if (!jwt) {
      return {user: null}
    }

    return {user: await findUserByToken(jwt)}
  }),
  signIn: procedure
    .input((body) => signInInput.parse(body))
    .output(authOutput)
    .mutation(async ({input, ctx}) => {
      const {user, token} = await signIn(input)

      setCookieToken(token, ctx.res)

      return {user}
    }),
  signUp: procedure
    .input((body) => signUpInput.parse(body))
    .output(authOutput)
    .mutation(async ({input, ctx}) => {
      const {user, token} = await signUp(input)

      setCookieToken(token, ctx.res)

      return {user}
    }),
})

type PassportRouter = typeof passportRouter

export {type PassportRouter, passportRouter}
