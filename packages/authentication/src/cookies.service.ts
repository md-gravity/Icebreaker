import {ServerResponse} from 'node:http'

const retrieveCookieToken = (cookie: string) => {
  const TOKEN_REGEXP = /[=](?<jwt>.*)/u

  const cookieTokenItem = cookie.split(';').find((item) => item.includes('jwt'))
  return cookieTokenItem?.match(TOKEN_REGEXP)?.groups?.jwt ?? null
}

const DEFAULT_MAX_AGE = 24 * 60 * 60 * 1000

const setCookieToken = (token: string, res: ServerResponse) =>
  res.setHeader(
    'Set-Cookie',
    `jwt=${token}; Path=/; Max-Age=${DEFAULT_MAX_AGE}`
  )

export {retrieveCookieToken, setCookieToken}
