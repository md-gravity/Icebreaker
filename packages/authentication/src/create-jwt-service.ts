import jwt from 'jsonwebtoken'

const createJWTService = <Payload>(privateKey: string) => {
  const sign = (payload: Payload) =>
    jwt.sign(payload, privateKey, {algorithm: 'HS256'})

  const verify = (token: string): Payload => jwt.verify(token, privateKey)

  return {
    sign,
    verify,
  }
}

export {createJWTService}
