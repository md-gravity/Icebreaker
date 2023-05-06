import {
  type HTTPResponse,
  isHTTPResponse,
  type Response,
} from '../library/context'

/**
 * Fix tRPC response type depends on http or ws server type.
 * tRPC when created don't know on which server it will be used(http or socket).
 */
const setCookies = (res: Response, cb: (res: HTTPResponse) => void) => {
  if (isHTTPResponse(res)) {
    cb(res)
  } else {
    console.warn('setCookies is only supported for HTTP responses')
  }
}

export {setCookies}
