import {type CreateHTTPContextOptions} from '@trpc/server/adapters/standalone'
import {type CreateWSSContextFnOptions} from '@trpc/server/adapters/ws'

type Context = typeof createContext

type HTTPResponse = CreateHTTPContextOptions['res']
type WSResponse = CreateWSSContextFnOptions['res']

type Response = HTTPResponse | WSResponse

/**
 * For future, we need to, somehow, to split http  and socket context
 * and make procedures infer this types.
 * Currently, we don't know on which server tRPC will be used.
 * Response type could be http response or socket.
 */
const createContext = ({
  req,
  res,
}: CreateHTTPContextOptions | CreateWSSContextFnOptions) => ({
  req,
  res,
})

const isHTTPResponse = (res: Response): res is HTTPResponse =>
  Boolean((res as HTTPResponse).statusCode)

export {
  type Context,
  type Response,
  type HTTPResponse,
  type WSResponse,
  createContext,
  isHTTPResponse,
}
