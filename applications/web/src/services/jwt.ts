const DEFAULT_MAX_AGE = 24 * 60 * 60 * 1000

const createJWTCookie = (token: string, maxAge = DEFAULT_MAX_AGE) =>
  (document.cookie = `jwt=${token}; domain=gravity.io; Max-Age=${maxAge}`)

export {createJWTCookie}
