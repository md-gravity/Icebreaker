import jwt from 'jsonwebtoken'
import {promisify} from 'node:util'

const asyncSign = promisify(jwt.sign)
const asyncVerify = promisify(jwt.verify)

interface Payload {
  userId: number
}

if (!process.env.JWT_SECRET_KEY) {
  throw new Error('Define "JWT_SECRET_KEY" in env')
}

const sign = (payload: Payload): Promise<string> =>
  asyncSign(payload, process.env.JWT_SECRET_KEY, {algorithm: 'HS256'})

const verify = async (token: string): Promise<Payload> =>
  asyncVerify(token, process.env.JWT_SECRET_KEY)

export {sign, verify}
export type {Payload}
