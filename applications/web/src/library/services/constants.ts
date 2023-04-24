if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined')
}

if (!process.env.NEXT_PUBLIC_INTERNAL_API_URL) {
  throw new Error('NEXT_PUBLIC_INTERNAL_API_URL is not defined')
}

const API_URL =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_INTERNAL_API_URL
    : process.env.NEXT_PUBLIC_API_URL

export {API_URL}
