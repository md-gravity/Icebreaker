import {
  createTemporalUserInput,
  CreateTemporalUserInputInterface,
} from '@app/inputs/create-temporal-user.input'
import {createJWTService} from '@packages/authentication/build'
import {getPassportDBClient} from '@packages/passport-db'
import {initTRPC} from '@trpc/server'
import crypto from 'node:crypto'

import type {Context} from '@app/lib/create-context'

const tRPC = initTRPC.context<Context>().create()
const {router, procedure} = tRPC

interface TokenPayload {
  userId: number
}
const JWTService = createJWTService<TokenPayload>('secret')

const passportRouter = router({
  createTemporalUser: procedure
    .input((body) => createTemporalUserInput.parse(body))
    .mutation(async ({input, ctx}) => {
      const user = await createTemporalUser(input)

      const token = JWTService.sign({userId: user.id})
      ctx.res.setHeader('Set-Cookie', `token=${token}`)

      return user
    }),
  currentUser: procedure.query(async ({ctx}) => {
    const {cookie} = ctx.req.headers
    if (!cookie) {
      return null
    }

    /**
     * TODO
     * 1) catch invalid token, expired token
     * 2) add secure property
     * 3) store tokens in session db; sessions[token, userId]
     */
    const {payload} = retrieveTokenCookie(cookie)
    if (payload) {
      return getPassportDBClient().user.findUnique({
        where: {id: payload.userId},
      })
    }

    return null
  }),
})

type PassportRouter = typeof passportRouter

export {passportRouter}
export type {PassportRouter}

function retrieveTokenCookie(cookie) {
  const cookieTokenItem: string = cookie
    .split(';')
    .find((item) => item.includes('token'))

  const tokenRegexp = /[=](?<token>.*)/u
  const token = cookieTokenItem?.match(tokenRegexp)?.groups?.token ?? null

  let payload: TokenPayload | null = null
  if (token) {
    payload = JWTService.verify(token)
  }

  return {
    payload,
    token,
  }
}

async function createTemporalUser(input: CreateTemporalUserInputInterface) {
  const hash = createHashForTemporalUser(input.username)
  return getPassportDBClient().user.create({
    data: {
      email: hash,
      passwordHash: hash,
      temporal: true,
      username: input.username,
    },
  })
}

function createHashForTemporalUser(username) {
  return crypto
    .createHash('md5')
    .update(
      JSON.stringify({
        data: new Date(),
        name: username,
        temporal: true,
      })
    )
    .digest('hex')
}
