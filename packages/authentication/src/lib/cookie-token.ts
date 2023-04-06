const TOKEN_REGEXP = /[=](?<token>.*)/u

const cookieToken = (cookie: string) => {
  const cookieTokenItem = cookie
    .split(';')
    .find((item) => item.includes('token'))

  return cookieTokenItem?.match(TOKEN_REGEXP)?.groups?.token ?? null
}

const DEFAULT_MAX_AGE = 24 * 60 * 60 * 1000

const createCookieToken = (token: string, maxAge = DEFAULT_MAX_AGE) => {
  return `token=${token}; Domain=gravity.io; Secure; HttpOnly; Max-Age=${maxAge}`
}

export {cookieToken, createCookieToken}
