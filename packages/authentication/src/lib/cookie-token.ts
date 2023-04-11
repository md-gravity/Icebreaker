const TOKEN_REGEXP = /[=](?<jwt>.*)/u

const cookieToken = (cookie: string) => {
  const cookieTokenItem = cookie.split(';').find((item) => item.includes('jwt'))

  return cookieTokenItem?.match(TOKEN_REGEXP)?.groups?.jwt ?? null
}

const DEFAULT_MAX_AGE = 24 * 60 * 60 * 1000

const createCookieToken = (token: string, maxAge = DEFAULT_MAX_AGE) =>
  `jwt=${token}; Domain=gravity.io; Secure; HttpOnly; Max-Age=${maxAge}`

export {cookieToken, createCookieToken}
