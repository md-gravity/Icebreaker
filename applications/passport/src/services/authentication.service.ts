import {createJwtService} from '@packages/authentication'

interface TokenPayload {
  userId: number
}

const jwtService = createJwtService<TokenPayload>('secret')

export {jwtService}
export type {TokenPayload}
