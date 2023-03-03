import {
  createFindTokenMiddleware,
  createJwtService,
} from '@packages/authentication'

interface TokenPayload {
  userId: number
}

const jwtService = createJwtService<TokenPayload>('secret')
const findTokenMiddleware = createFindTokenMiddleware(jwtService)

export {jwtService, findTokenMiddleware}
export type {TokenPayload}
