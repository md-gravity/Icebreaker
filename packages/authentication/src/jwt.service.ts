import jwt from 'jsonwebtoken'
import {promisify} from 'node:util'

const asyncSign = promisify(jwt.sign)
const asyncVerify = promisify(jwt.verify)

const createJwtService = <Payload>(privateKey: string) => {
  const sign = (payload: Payload): Promise<string> =>
    asyncSign(payload, privateKey, {algorithm: 'HS256'})

  const verify = async (token: string): Promise<Payload> =>
    asyncVerify(token, privateKey)

  return {
    sign,
    verify,
  }
}

export {createJwtService}
