import {promisify} from 'node:util'

import jwt from 'jsonwebtoken'

const asyncSign = promisify(jwt.sign)
const asyncVerify = promisify(jwt.verify)

if (!process.env.JWT_SECRET_KEY) {
  throw new Error('Define "JWT_SECRET_KEY" in env')
}

type Payload = {userId: number}

const sign = (payload: Payload): Promise<string> =>
  asyncSign(payload, process.env.JWT_SECRET_KEY, {algorithm: 'HS256'})

const verify = async (token: string): Promise<Payload> =>
  asyncVerify(token, process.env.JWT_SECRET_KEY)

export {type Payload, sign, verify}
