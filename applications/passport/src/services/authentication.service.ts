import {createJwtService} from '@packages/authentication'

import type {Payload as TokenPayload} from '@packages/authentication'

const jwtService = createJwtService('secret')

export {jwtService}
export type {TokenPayload}
