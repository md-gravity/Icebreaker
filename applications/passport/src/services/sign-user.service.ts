import {CreateTemporalUserInputInterface} from '@app/inputs/create-temporal-user.input'
import {SignInInputInterface} from '@app/inputs/sign-in-user.input'
import {SignUpInputInterface} from '@app/inputs/sign-up-user.input'
import {jwtService} from '@app/services/authentication.service'
import {
  comparePasswords,
  createPasswordHash,
} from '@app/services/password.service'
import {getPassportDBClient} from '@packages/passport-db'
import crypto from 'node:crypto'

/**
 * TODO: remove password from payload
 */

async function signUp(input: SignUpInputInterface) {
  if (
    await getPassportDBClient().user.findUnique({where: {email: input.email}})
  ) {
    throw new Error('Email already exists')
  }

  const user = await getPassportDBClient().user.create({
    data: {
      email: input.email,
      passwordHash: await createPasswordHash(input.password),
      temporal: false,
      username: input.username,
    },
  })
  const token = await jwtService.sign({userId: user.id})

  return {token, user}
}

async function temporalSignUp(input: CreateTemporalUserInputInterface) {
  const hash = createHashForTemporalUser(input.username)
  const user = await getPassportDBClient().user.create({
    data: {
      email: hash,
      passwordHash: hash,
      temporal: true,
      username: input.username,
    },
  })
  const token = await jwtService.sign({userId: user.id})

  return {token, user}
}

async function signIn(input: SignInInputInterface) {
  const user = await getPassportDBClient().user.findUnique({
    where: {email: input.email},
  })

  if (!user) {
    throw new Error('Invalid credentials')
  }
  if (!(await comparePasswords(user.passwordHash, input.password))) {
    throw new Error('Invalid credentials')
  }

  const token = await jwtService.sign({userId: user.id})

  return {token, user}
}

async function currentUser(cookie: string) {
  /**
   * TODO
   * 1) catch invalid token, expired token
   * 2) add secure property
   * 3) store tokens in session db; sessions[token, userId]
   */
  const {payload} = await jwtService.retrieveCookieToken(cookie)
  if (payload) {
    return getPassportDBClient().user.findUnique({
      where: {id: payload.userId},
    })
  }

  return null
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

export {signUp, signIn, currentUser, temporalSignUp}
