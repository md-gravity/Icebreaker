const TOKEN_REGEXP = /[=](?<token>.*)/u

const retrieveCookieToken = (cookie: string) => {
  const cookieTokenItem = cookie
    .split(';')
    .find((item) => item.includes('token'))

  return cookieTokenItem?.match(TOKEN_REGEXP)?.groups?.token ?? null
}

export {retrieveCookieToken}
