import jwt from 'jsonwebtoken'
import {promisify} from 'node:util'

const asyncSign = promisify(jwt.sign)
const asyncVerify = promisify(jwt.verify)

const createJwtService = <Payload>(privateKey: string) => {
  const sign = (payload: Payload): Promise<string> =>
    asyncSign(payload, privateKey, {algorithm: 'HS256'})

  const verify = async (token: string): Promise<Payload> =>
    asyncVerify(token, privateKey)

  async function retrieveCookieToken(cookie: string) {
    const cookieTokenItem = cookie
      .split(';')
      .find((item) => item.includes('token'))

    const tokenRegexp = /[=](?<token>.*)/u
    const token = cookieTokenItem?.match(tokenRegexp)?.groups?.token ?? null

    if (!token) {
      return null
    }

    return {
      payload: await verify(token),
      token,
    }
  }

  return {
    retrieveCookieToken,
    sign,
    verify,
  }
}

export {createJwtService}
