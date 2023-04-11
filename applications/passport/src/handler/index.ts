import {createContext} from '@app/handler/context'
import {type PassportRouter, passportRouter} from '@app/handler/router'
import {cors} from '@packages/cors'
import {createHTTPHandler} from '@trpc/server/adapters/standalone'

const handler = createHTTPHandler({
  createContext,
  middleware: cors('http://gravity.io'),
  router: passportRouter,
})

export {type PassportRouter, handler}
