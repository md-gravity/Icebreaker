import crypto from 'node:crypto'

import {type Payload as JwtPayload, sign} from '@packages/authentication'

import {type AuthOutputInterface} from '@app/dtos/auth.output'
import {type CreateTemporalUserInputInterface} from '@app/dtos/create-temporal-user.input'
import {type SignInInputInterface} from '@app/dtos/sign-in-user.input'
import {type SignUpInputInterface} from '@app/dtos/sign-up-user.input'
import {getPrismaClient} from '@app/library/prisma-client'
import {emitUserCreated} from '@app/services/duct.service'
import {
  comparePasswords,
  createPasswordHash,
} from '@app/services/password.service'

async function signUp(
  input: SignUpInputInterface
): Promise<AuthOutputInterface & {token: string}> {
  if (await getPrismaClient().user.findUnique({where: {email: input.email}})) {
    throw new Error('Email already exists')
  }

  const user = await getPrismaClient().user.create({
    data: {
      email: input.email,
      passwordHash: await createPasswordHash(input.password),
      temporal: false,
      username: input.username,
    },
  })

  await emitUserCreated(user)

  const token = await sign({userId: user.id})

  return {token, user}
}

async function temporalSignUp(
  input: CreateTemporalUserInputInterface
): Promise<AuthOutputInterface & {token: string}> {
  const hash = createHashForTemporalUser(input.username)
  const user = await getPrismaClient().user.create({
    data: {
      email: hash,
      passwordHash: hash,
      temporal: true,
      username: input.username,
    },
  })

  await emitUserCreated(user)

  const token = await sign({userId: user.id})

  return {token, user}
}

async function signIn(
  input: SignInInputInterface
): Promise<AuthOutputInterface & {token: string}> {
  const user = await getPrismaClient().user.findUnique({
    where: {email: input.email},
  })

  if (!user) {
    throw new Error('Invalid credentials')
  }
  if (!(await comparePasswords(user.passwordHash, input.password))) {
    throw new Error('Invalid credentials')
  }

  const token = await sign({userId: user.id})

  return {token, user}
}

async function findUserByToken(jwtPayload: JwtPayload) {
  return getPrismaClient().user.findUnique({
    where: {id: jwtPayload.userId},
  })
}

function createHashForTemporalUser(username): string {
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

export {signUp, signIn, findUserByToken, temporalSignUp}
