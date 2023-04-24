import {createTemporalUserInput} from '@app/dtos/create-temporal-user.input'
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
import {userDto} from '@packages/dtos'

const passportRouter = router({
  createTemporalUser: procedure
    .input((body) => createTemporalUserInput.parse(body))
    .output(userDto)
    .mutation(async ({input, ctx}) => {
      const {user, token} = await temporalSignUp(input)

      setCookieToken(token, ctx.res)

      return user
    }),
  currentUser: tokenProcedure
    .output(userDto.nullable())
    .query(async ({ctx}) => {
      const {jwt} = ctx
      if (!jwt) {
        return null
      }

      return findUserByToken(jwt)
    }),
  signIn: procedure
    .input((body) => signInInput.parse(body))
    .output(userDto)
    .mutation(async ({input, ctx}) => {
      const {user, token} = await signIn(input)

      setCookieToken(token, ctx.res)

      return user
    }),
  signUp: procedure
    .input((body) => signUpInput.parse(body))
    .output(userDto)
    .mutation(async ({input, ctx}) => {
      const {user, token} = await signUp(input)

      setCookieToken(token, ctx.res)

      return user
    }),
})

type PassportRouter = typeof passportRouter

export {type PassportRouter, passportRouter}
