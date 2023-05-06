import {setCookieToken as setToken} from '@packages/authentication'

import {type HTTPResponse, type Response} from '../library/context'

import {setCookies} from './set-cookies'

const setCookieToken = (res: Response, token: string) => {
  setCookies(res, (httpRes: HTTPResponse) => setToken(token, httpRes))
}

export {setCookieToken}
