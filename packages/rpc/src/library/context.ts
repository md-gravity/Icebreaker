import {type CreateHTTPContextOptions} from '@trpc/server/adapters/standalone'
import {type CreateWSSContextFnOptions} from '@trpc/server/adapters/ws'

type Context = typeof createContext

type HTTPResponse = CreateHTTPContextOptions['res']
type WSResponse = CreateWSSContextFnOptions['res']

type Response = HTTPResponse | WSResponse

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
