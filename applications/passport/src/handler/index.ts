import {createContext} from '@app/handler/context'
import {type PassportRouter, passportRouter} from '@app/handler/router'
import {createHTTPHandler} from '@trpc/server/adapters/standalone'

const handler = createHTTPHandler({
  createContext,
  router: passportRouter,
})

export {type PassportRouter, handler}
